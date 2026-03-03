"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { addFood } from "@/lib/db";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export default function ProAddFoodForm() {
  const { register, handleSubmit } = useForm();
  const [portionOptions, setPortionOptions] = useState([
    { label: "Small", price: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  const addPortion = () => {
    if (portionOptions.length < 5) {
      setPortionOptions([...portionOptions, { label: "", price: 0 }]);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);

    const files = Array.from(data.images);
    const uploadedImages = [];

    for (const file of files) {
      const res = await uploadImageToCloudinary(file as File);
      uploadedImages.push({
        url: res.secure_url,
        publicId: res.public_id,
      });
    }

    const foodData = {
      title: data.title,
      description: data.description,
      category: data.category,
      portionOptions,
      images: uploadedImages,
      isAvailable: true,
      isSpecial: false,
      featured: false,
      createdAt: new Date().toISOString(),
    };

    await addFood(foodData);
    alert("Food added ✅");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-md space-y-6"
    >
      <h3 className="text-xl font-semibold">Add Food Item</h3>

      <input {...register("title")} placeholder="Title"
        className="w-full p-3 border rounded-lg" />

      <textarea {...register("description")} placeholder="Description"
        className="w-full p-3 border rounded-lg" />

      <select {...register("category")}
        className="w-full p-3 border rounded-lg">
        <option value="rice">Rice</option>
        <option value="pasta">Pasta</option>
        <option value="soups">Soups</option>
        <option value="swallow">Swallow</option>
      </select>

      <div className="space-y-4">
        <h4 className="font-semibold">Portion Pricing</h4>

        {portionOptions.map((portion, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Label</label>
              <input
                className="w-full p-2 border rounded-lg"
                placeholder="e.g Small"
                onChange={(e) => {
                  const updated = [...portionOptions];
                  updated[index].label = e.target.value;
                  setPortionOptions(updated);
                }}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Price (₦)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                placeholder="1500"
                onChange={(e) => {
                  const updated = [...portionOptions];
                  updated[index].price = Number(e.target.value);
                  setPortionOptions(updated);
                }}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addPortion}
          className="text-orange-600 text-sm"
        >
          + Add Another Portion
        </button>
      </div>

      <div>
        <label className="text-sm text-gray-500">Upload Images (1–4)</label>
        <input type="file" multiple {...register("images")}
          className="w-full mt-1" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Uploading..." : "Add Food"}
      </button>
    </form>
  );
}
