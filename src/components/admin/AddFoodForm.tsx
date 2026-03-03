"use client";

import { useForm } from "react-hook-form";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { addFood } from "@/lib/db";
import { useState } from "react";

export default function AddFoodForm() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      const file = data.image[0];

      const uploadResult = await uploadImageToCloudinary(file);

      const newFood = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        imageUrl: uploadResult.secure_url,
        imagePublicId: uploadResult.public_id,
        isAvailable: true,
        isSpecial: false,
        createdAt: new Date().toISOString(),
      };

      await addFood(newFood);

      alert("Food added successfully ✅");
      reset();
    } catch (err) {
      console.error(err);
      alert("Error adding food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-3xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add New Food</h2>

      <input
        {...register("title")}
        placeholder="Food title"
        className="w-full bg-gray-100 p-3 rounded-xl"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full bg-gray-100 p-3 rounded-xl"
      />

      <input
        type="number"
        {...register("price")}
        placeholder="Price"
        className="w-full bg-gray-100 p-3 rounded-xl"
      />

      <input
        type="file"
        {...register("image")}
        className="w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-orange-500 text-white px-6 py-3 rounded-xl"
      >
        {loading ? "Uploading..." : "Add Food"}
      </button>
    </form>
  );
}
