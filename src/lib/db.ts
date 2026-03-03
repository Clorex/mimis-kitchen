import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

// ================= FOOD =================

export async function addFood(data: any) {
  const docRef = await addDoc(collection(db, "foods"), data);
  return docRef.id;
}

export async function getFoods() {
  const snapshot = await getDocs(collection(db, "foods"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteFood(id: string) {
  await deleteDoc(doc(db, "foods", id));
}

export async function updateFood(id: string, data: any) {
  await updateDoc(doc(db, "foods", id), data);
}

// ================= ORDERS =================

export async function getOrders() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateOrderStatus(id: string, status: string) {
  await updateDoc(doc(db, "orders", id), { status });
}

