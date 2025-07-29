"use server";

import { API_URL } from "@/app/common/constants/api";
import { getHeaders, post } from "@/app/common/util/fetch";
import { revalidateTag } from "next/cache";
import Products from "../products";



export default async function createProduct(formData: FormData) {
  const response = await post("products", formData);
  const productimage = formData.get("image");
  if(productimage instanceof File && !response.error)
  {
    
    await  uploadProductImage(response.data.id, productimage)
    
  }
  revalidateTag("products");
  return response;
}


async function uploadProductImage(productId: number, file: File)
{

  const formData = new FormData();
  formData.append('image',file);
  
  await fetch(`${API_URL}/Products/${productId}/image`,{
    body: formData,
    headers: getHeaders(),
    method:"POST",

  })


}
