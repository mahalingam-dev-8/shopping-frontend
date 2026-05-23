"use client"

import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Product as IProduct } from "./productsprops.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";



interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
 
const router = useRouter()

  return (


    <CardActionArea onClick={() => router.push(`/products/${product.id}`)}>  
      <Stack gap={3}>
      <Card className="p-4">
      <Typography variant="h4">{product.name}</Typography>
      <Typography>{product.description}</Typography>
      {
        product.imageUrl && (
          <Image src={product.imageUrl} alt="Picture of the product" height="0" width="0" className="w-full h-auto" sizes="100vw"/>
        )
      }
      <Typography>${product.price}</Typography>
      
    </Card>
    </Stack>
    </CardActionArea>
   
  );
}