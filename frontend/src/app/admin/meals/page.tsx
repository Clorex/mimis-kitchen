"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function MealsPage() {

  const emptyForm = {
    name: "",
    description: "",
    category: "Rice",
    spiceLevel: 1,
    portions: [
      { name: "Small", weight: "500g", price: 0 },
      { name: "Big", weight: "1kg", price: 0 }
    ],
    trackStock: false,
    stockQuantity: 0,
    isSoldOut: false,
    featureHomepage: false,
    featureSpecials: false,
    featureMenu: true,
    image: ""
  };

  const [form, setForm] = useState<any>(emptyForm);
  const [meals, setMeals] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sortBy, setSortBy] = useState("date");

  const loadMeals = async () => {
    const snap = await getDocs(collection(db, "meals"));
    setMeals(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { loadMeals(); }, []);

  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const imageRef = ref(storage, `meals/${Date.now()}-${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  };

  const saveMeal = async () => {
    if (!form.name || form.portions[0].price <= 0) return;

    const imageUrl = await uploadImage();

    const payload = {
      ...form,
      images: imageUrl ? [imageUrl] : [],
      createdAt: Timestamp.now(),
      archived: false
    };

    if (editingId) {
      await updateDoc(doc(db, "meals", editingId), payload);
    } else {
      await addDoc(collection(db, "meals"), payload);
    }

    setForm(emptyForm);
    setEditingId(null);
    setImageFile(null);
    loadMeals();
  };

  const editMeal = (meal:any) => {
    setForm({
      ...meal,
      image: meal.images?.[0] || ""
    });
    setEditingId(meal.id);
  };

  const deleteMeal = async (id:string) => {
    await deleteDoc(doc(db,"meals",id));
    loadMeals();
  };

  const updatePortion = (index:number, field:string, value:any) => {
    const updated = [...form.portions];
    updated[index][field] = value;
    setForm({ ...form, portions: updated });
  };

  const sortedMeals = [...meals].sort((a,b)=>{
    if(sortBy==="date") return b.createdAt?.seconds - a.createdAt?.seconds;
    if(sortBy==="category") return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="max-w-md mx-auto space-y-8 pb-28">

      <h1 className="text-2xl font-bold">Meals</h1>

      {/* ADD / EDIT CARD */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        <h2 className="text-sm font-semibold text-gray-500 uppercase">
          {editingId ? "Edit Meal" : "Add Meal"}
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">Basic Info</h3>

          <input
            placeholder="Meal Name *"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="border rounded-xl p-3 w-full"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
            className="border rounded-xl p-3 w-full"
          />

          <select
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="border rounded-xl p-3 w-full"
          >
            <option>Rice</option>
            <option>Soups</option>
            <option>Swallow</option>
            <option>Proteins</option>
          </select>
        </div>

        {/* PRICING */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">Pricing</h3>

          {form.portions.map((p:any,i:number)=>(
            <div key={i} className="grid grid-cols-3 gap-2">
              <input
                value={p.name}
                onChange={(e)=>updatePortion(i,"name",e.target.value)}
                className="border rounded-xl p-3"
              />
              <input
                value={p.weight}
                onChange={(e)=>updatePortion(i,"weight",e.target.value)}
                className="border rounded-xl p-3"
              />
              <input
                type="number"
                value={p.price}
                onChange={(e)=>updatePortion(i,"price",Number(e.target.value))}
                className="border rounded-xl p-3"
              />
            </div>
          ))}
        </div>

        {/* INVENTORY */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">Inventory</h3>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.trackStock}
              onChange={(e)=>setForm({...form,trackStock:e.target.checked})}
            />
            Track Stock
          </label>

          {form.trackStock && (
            <input
              type="number"
              placeholder="Stock Quantity"
              value={form.stockQuantity}
              onChange={(e)=>setForm({...form,stockQuantity:Number(e.target.value)})}
              className="border rounded-xl p-3 w-full"
            />
          )}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isSoldOut}
              onChange={(e)=>setForm({...form,isSoldOut:e.target.checked})}
            />
            Mark as Sold Out
          </label>
        </div>

        {/* VISIBILITY */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-400 uppercase">Visibility</h3>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featureHomepage}
              onChange={(e)=>setForm({...form,featureHomepage:e.target.checked})}
            />
            Homepage
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featureSpecials}
              onChange={(e)=>setForm({...form,featureSpecials:e.target.checked})}
            />
            Specials
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featureMenu}
              onChange={(e)=>setForm({...form,featureMenu:e.target.checked})}
            />
            Menu
          </label>
        </div>

        {/* IMAGE */}
        <div>
          {form.image && (
            <img src={form.image} className="w-full h-32 object-cover rounded mb-2"/>
          )}

          <input
            type="file"
            onChange={(e)=>setImageFile(e.target.files?.[0]||null)}
          />
        </div>

        <button
          onClick={saveMeal}
          className="bg-orange-500 text-white w-full py-3 rounded-xl font-semibold"
        >
          {editingId ? "Update Meal" : "Add Meal"}
        </button>

      </div>

      {/* SORT */}
      <select
        value={sortBy}
        onChange={(e)=>setSortBy(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option value="date">Newest</option>
        <option value="category">Category</option>
      </select>

      {/* MEAL LIST */}
      <div className="space-y-4">
        {sortedMeals.map(meal=>(
          <div key={meal.id} className="bg-white p-4 rounded-xl shadow space-y-2">

            <div className="flex justify-between">
              <p className="font-semibold">{meal.name}</p>
              <div className="flex gap-2 text-xs">
                <button onClick={()=>editMeal(meal)} className="text-blue-500">Edit</button>
                <button onClick={()=>deleteMeal(meal.id)} className="text-red-500">Delete</button>
              </div>
            </div>

            <p className="text-xs text-gray-500">{meal.category}</p>

            <p className="text-xs">
              Small: ₦{meal.portions?.[0]?.price} | Big: ₦{meal.portions?.[1]?.price}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}
