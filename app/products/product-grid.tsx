"use client";
import { io, Socket } from 'socket.io-client';
import Grid from "@mui/material/Unstable_Grid2";
import Product from "./product";
import { Product as IProduct } from "./productsprops.interface";
import { useEffect } from "react";
import { API_URL } from '../common/constants/api';
import revalidateProducts from './actions/revalidate-product';
import getAuthentication from '../auth/get-authenticated';

interface Productgrid{
     products : IProduct[];
}


export default function ProductsGrid({products}: Productgrid){

    useEffect(() =>
        {

     let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };

        }
    )

    return( 
       <Grid container spacing={3} sx={{ height: "85vh" , overflow : "scroll" }} >
        {products.map((product) => (
            <Grid key={product.id} sm={6} lg={4} xs={12}  ><Product product={product} /></Grid>
        ))}
       </Grid>
    )
      

}