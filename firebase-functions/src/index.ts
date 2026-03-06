import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

// ✅ STRICT ORDER LIFECYCLE
const allowedTransitions: Record<string, string[]> = {
  waiting_for_payment: ["payment_uploaded"],
  payment_uploaded: ["payment_confirmed", "rejected"],
  payment_confirmed: ["confirmed"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["completed"],
  completed: [],
  rejected: [],
  cancelled: [],
};

// ✅ TRIGGER ON ORDER UPDATE
export const onOrderUpdate = onDocumentUpdated(
  "orders/{orderId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    const orderId = event.params.orderId;

    if (!before || !after) return;

    // ✅ Enforce strict orderStatus transitions
    if (before.orderStatus !== after.orderStatus) {
      const allowed = allowedTransitions[before.orderStatus] || [];
      if (!allowed.includes(after.orderStatus)) {
        throw new Error("Invalid order status transition");
      }

      await db
        .collection("orders")
        .doc(orderId)
        .collection("logs")
        .add({
          action: `Order moved to ${after.orderStatus}`,
          timestamp: FieldValue.serverTimestamp(),
          system: true,
        });
    }

    // ✅ When payment confirmed → reduce stock + update analytics
    if (
      before.paymentStatus !== "payment_confirmed" &&
      after.paymentStatus === "payment_confirmed"
    ) {
      await handleStockReduction(after);
      await updateDailyAnalytics(after);
    }
  }
);

// ✅ STOCK REDUCTION
async function handleStockReduction(order: any) {
  for (const item of order.items || []) {
    const mealRef = db.collection("meals").doc(item.mealId);
    const mealSnap = await mealRef.get();

    if (!mealSnap.exists) continue;

    const mealData: any = mealSnap.data();

    if (mealData.trackStock) {
      const newStock = (mealData.stockQuantity || 0) - item.quantity;

      await mealRef.update({
        stockQuantity: newStock,
        isSoldOut: newStock <= 0,
      });
    }
  }

  if (order.specialId) {
    const specialRef = db.collection("specials").doc(order.specialId);
    const specialSnap = await specialRef.get();

    if (specialSnap.exists) {
      const data: any = specialSnap.data();
      const newQty = (data.quantityRemaining || 0) - 1;

      await specialRef.update({
        quantityRemaining: newQty,
        isActive: newQty > 0,
      });
    }
  }
}

// ✅ DAILY ANALYTICS UPDATE
async function updateDailyAnalytics(order: any) {
  const today = new Date().toISOString().split("T")[0];
  const analyticsRef = db.collection("analytics_daily").doc(today);

  await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(analyticsRef);

    if (!doc.exists) {
      transaction.set(analyticsRef, {
        date: today,
        totalRevenue: order.totalAmount,
        totalOrders: 1,
        avgOrderValue: order.totalAmount,
      });
    } else {
      const data: any = doc.data();
      const newTotalRevenue =
        (data.totalRevenue || 0) + order.totalAmount;
      const newTotalOrders = (data.totalOrders || 0) + 1;

      transaction.update(analyticsRef, {
        totalRevenue: newTotalRevenue,
        totalOrders: newTotalOrders,
        avgOrderValue: newTotalRevenue / newTotalOrders,
      });
    }
  });
}