import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { FoodItem, Protein, Special, Order, HomepageConfig } from "@/types";

// ============ MEALS ============
export async function getMeals(): Promise<FoodItem[]> {
  const q = query(
    collection(db, "meals"),
    where("archived", "==", false),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as FoodItem[];
}

export async function getMeal(id: string): Promise<FoodItem | null> {
  const docRef = doc(db, "meals", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data(), createdAt: snapshot.data().createdAt?.toDate() } as FoodItem;
}

export async function getFoods(): Promise<FoodItem[]> {
  return getMeals();
}

export async function addMeal(meal: Omit<FoodItem, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "meals"), {
    ...meal,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateMeal(id: string, data: Partial<FoodItem>): Promise<void> {
  const docRef = doc(db, "meals", id);
  await updateDoc(docRef, data);
}

export async function archiveMeal(id: string): Promise<void> {
  await updateMeal(id, { archived: true });
}

// ============ PROTEINS ============
export async function getProteins(): Promise<Protein[]> {
  const q = query(collection(db, "proteins"), where("isAvailable", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as Protein[];
}

export async function addProtein(protein: Omit<Protein, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "proteins"), {
    ...protein,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateProtein(id: string, data: Partial<Protein>): Promise<void> {
  const docRef = doc(db, "proteins", id);
  await updateDoc(docRef, data);
}

// ============ SPECIALS ============
export async function getActiveSpecials(): Promise<Special[]> {
  const now = Timestamp.now();
  const q = query(
    collection(db, "specials"),
    where("isActive", "==", true),
    where("endDate", ">", now)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    startDate: doc.data().startDate?.toDate(),
    endDate: doc.data().endDate?.toDate(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as Special[];
}

export async function addSpecial(special: Omit<Special, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "specials"), {
    ...special,
    startDate: Timestamp.fromDate(special.startDate),
    endDate: Timestamp.fromDate(special.endDate),
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

// ============ ORDERS ============
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MK-${dateStr}-${random}`;
}

export async function createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">): Promise<string> {
  const orderNumber = generateOrderNumber();
  const now = Timestamp.now();
  
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    orderNumber,
    createdAt: now,
    updatedAt: now,
  });
  
  return docRef.id;
}

export async function getOrders(statusFilter?: string): Promise<Order[]> {
  let q;
  if (statusFilter) {
    q = query(
      collection(db, "orders"),
      where("string", "==", statusFilter),
      orderBy("createdAt", "desc"),
      limit(50)
    );
  } else {
    q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(50));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Order[];
}

export async function updatestring(
  orderId: string,
  string: string,
  adminUID: string,
  note?: string
): Promise<void> {
  const batch = writeBatch(db);
  
  const orderRef = doc(db, "orders", orderId);
  batch.update(orderRef, {
    string,
    updatedAt: Timestamp.now(),
    ...(note && { adminNote: note }),
  });
  
  const logRef = doc(collection(db, "orders", orderId, "logs"));
  batch.set(logRef, {
    action: `Status changed to ${string}`,
    timestamp: Timestamp.now(),
    adminUID,
  });
  
  await batch.commit();
}

export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: "payment_confirmed" | "rejected",
  adminUID: string,
  note?: string
): Promise<void> {
  const batch = writeBatch(db);
  
  const orderRef = doc(db, "orders", orderId);
  const updates: any = {
    paymentStatus,
    updatedAt: Timestamp.now(),
  };
  
  if (paymentStatus === "payment_confirmed") {
    updates.string = "confirmed";
  }
  if (note) {
    updates.adminNote = note;
  }
  
  batch.update(orderRef, updates);
  
  const logRef = doc(collection(db, "orders", orderId, "logs"));
  batch.set(logRef, {
    action: `Payment ${paymentStatus}`,
    timestamp: Timestamp.now(),
    adminUID,
  });
  
  await batch.commit();
}

// ============ HOMEPAGE CONFIG ============
export async function getHomepageConfig(): Promise<HomepageConfig | null> {
  const docRef = doc(db, "config", "homepage");
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as HomepageConfig;
}

export async function updateHomepageConfig(config: Partial<HomepageConfig>): Promise<void> {
  const docRef = doc(db, "config", "homepage");
  await updateDoc(docRef, config);
}
