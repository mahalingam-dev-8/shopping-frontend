import { get } from "@/app/common/util/fetch";
import { Product } from "../productsprops.interface";


export default async function gproduct(productId:number){
                     return get<Product>(`products/${productId}`);
}