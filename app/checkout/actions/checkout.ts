"use server"
import { post } from "@/app/common/util/fetch";

export default async function checkout(productnumber: number, successUrl: string, cancelUrl: string){
     return post("checkout/session", { productnumber, successUrl, cancelUrl })
}
