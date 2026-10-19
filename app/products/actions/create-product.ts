"use server";

import { API_URL } from "@/app/common/constants/api";
import { getHeaders, post } from "@/app/common/util/fetch";
import { getErrorMessage } from "@/app/common/util/errors";
import { revalidateTag } from "next/cache";

export interface CreateProductResult {
  error: string;
  /** Set when the product was created but its image could not be uploaded. */
  imageError?: string;
}

export default async function createProduct(formData: FormData): Promise<CreateProductResult> {
  const response = await post("products", formData);
  if (response.error) {
    return { error: response.error };
  }

  let imageError: string | undefined;
  const productimage = formData.get("image");
  // With no file chosen the browser still sends an empty File; only upload a real one.
  if (productimage instanceof File && productimage.size > 0) {
    imageError = await uploadProductImage(response.data.id, productimage);
  }

  revalidateTag("products");
  return { error: "", imageError };
}

/** Returns the backend's error message, or undefined when the upload succeeded. */
async function uploadProductImage(productId: number, file: File): Promise<string | undefined> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    headers: getHeaders(),
    method: "POST",
  });
  if (res.ok) {
    return undefined;
  }
  const body = await res.json().catch(() => ({}));
  console.error("[uploadProductImage] status:", res.status, "response:", body);
  return getErrorMessage(body);
}
