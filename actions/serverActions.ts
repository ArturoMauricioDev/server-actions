"use server";

import { revalidateTag } from "next/cache";
import { Product } from "@/typings";

export const addProductToDatabase = async (e: FormData) => {
  "use server";
  const product = e.get("product")?.toString();
  const price = e.get("price")?.toString();

  if (!product || !price) return;

  const newProduct: Product = {
    product,
    price,
  };

  await fetch("https://65327c0fd80bd20280f59ea5.mockapi.io/api/v1/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("products");
};
