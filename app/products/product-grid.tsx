"use client";
import { io, Socket } from 'socket.io-client';
import Grid from "@mui/material/Unstable_Grid2";
import Product from "./product";
import { Product as IProduct } from "./productsprops.interface";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import getAuthentication from '../auth/get-authenticated';

interface Productgrid{
     products : IProduct[];
}


export default function ProductsGrid({products}: Productgrid){

    const router = useRouter();
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
      const createSocket = async () => {
        const auth = await getAuthentication();
        const origin = window.location.origin;
        socketRef.current = io(origin, {
          path: "/api/socket.io/",
          transports: ["polling"],
          withCredentials: true,
          auth: { Authentication: auth?.value },
        });

        socketRef.current.on("updated", () => {
          router.refresh();
        });
      };

      createSocket();

      return () => {
        socketRef.current?.disconnect();
      };
    }, []);

    return(
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} sm={6} lg={4} xs={12}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    )
      

}