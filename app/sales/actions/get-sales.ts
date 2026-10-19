"use server";

import { get } from "@/app/common/util/fetch";

export interface Sale {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    sold: boolean;
  };
  user: {
    id: number;
    email: string;
    role: string;
  };
}

/** Orders placed for the logged-in admin's products; null when the backend refuses (not an admin). */
export default async function getSales(): Promise<Sale[] | null> {
  const res = await get<Sale[] | { statusCode: number }>("orders/all");
  return Array.isArray(res) ? res : null;
}
