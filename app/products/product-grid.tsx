"use client";
import { Client } from "@stomp/stompjs";
import Grid from "@mui/material/Unstable_Grid2";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Product from "./product";
import { Product as IProduct } from "./productsprops.interface";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminContext } from "../auth/admin-context";
import CreateProductButton from "./create-product/create-product-button";

import getAuthentication from '../auth/get-authenticated';
import { API_URL } from "../common/constants/api";

interface Productgrid{
     products : IProduct[];
}


export default function ProductsGrid({products}: Productgrid){

    const router = useRouter();
    const isAdmin = useContext(AdminContext);
    const [search, setSearch] = useState("");

    useEffect(() => {
      let client: Client | undefined;
      // The effect can be cleaned up before the async token lookup finishes
      // (React strict mode runs effects twice in dev); don't connect then.
      let cancelled = false;

      const connect = async () => {
        const auth = await getAuthentication();
        if (cancelled || !auth?.value) return;

        const backendUrl = API_URL || 'http://localhost:3001';
        client = new Client({
          // http -> ws, https -> wss
          brokerURL: backendUrl.replace(/^http/, "ws") + "/ws",
          connectHeaders: { Authentication: auth.value },
          reconnectDelay: 5000,
          onConnect: () => {
            client?.subscribe("/topic/products", () => {
              router.refresh();
            });
          },
        });
        client.activate();
      };

      connect();

      return () => {
        cancelled = true;
        client?.deactivate();
      };
    }, [router]);

    const query = search.trim().toLowerCase();
    const visible = query
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
      : products;

    return(
      <>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          mb={3}
        >
          <Stack direction="row" alignItems="baseline" spacing={1.5}>
            <Typography variant="h5" fontWeight={700}>Products</Typography>
            <Typography variant="body2" color="text.secondary">{visible.length} items</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center">
            {products.length > 0 && (
              <TextField
                size="small"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ width: { xs: "100%", sm: 280 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {products.length > 0 && <CreateProductButton />}
          </Stack>
        </Stack>

        {visible.length === 0 ? (
          <Stack alignItems="center" spacing={2} py={10} textAlign="center">
            <ShoppingBagIcon sx={{ fontSize: 64, color: "#2a2a2a" }} />
            <Typography color="text.secondary">
              {products.length > 0
                ? `No products match "${search.trim()}".`
                : isAdmin
                  ? "No products yet. List your first one to start selling."
                  : "No products yet. Check back soon."}
            </Typography>
            {products.length === 0 && <CreateProductButton />}
          </Stack>
        ) : (
          <Grid container spacing={3}>
            {visible.map((product) => (
              <Grid key={product.id} sm={6} lg={4} xs={12}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    )


}
