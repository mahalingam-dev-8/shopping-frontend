"use server"
import { post } from "@/app/common/util/fetch";

export default async function checkout(productnumber: number){
     return post("checkout/session", {productnumber })
}
