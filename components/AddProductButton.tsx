"use client";

import { addProductToDatabase } from "@/actions/serverActions";

export const AddProductButton = () => {
  const formData = new FormData();
  formData.append("product", "iphone 16");
  formData.append("price", "1299.99");

  return (
    <button
      onClick={() => addProductToDatabase(formData)}
      className="fixed bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md w-48"
    >
      Add
    </button>
  );
};
