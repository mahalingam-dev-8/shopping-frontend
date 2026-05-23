"use server";

import { get } from "@/app/common/util/fetch";

export interface Order {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    sold: boolean;
  };
}

export default async function getOrders(): Promise<Order[]> {
  return get<Order[]>("orders");
}
