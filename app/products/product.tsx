"use client"

import { Card, CardContent, Box, Typography, Chip } from "@mui/material";
import { Product as IProduct } from "./productsprops.interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/products/${product.id}`)}
      sx={{
        cursor: "pointer",
        height: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 16px 48px rgba(245, 158, 11, 0.12)",
          borderColor: "#f59e0b44",
        },
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "60%", bgcolor: "#0d0d0d", overflow: "hidden" }}>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 600px) 100vw, 33vw"
          />
        ) : (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBagIcon sx={{ fontSize: 48, color: "#2a2a2a" }} />
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" noWrap fontWeight={600} mb={0.5}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap mb={2}>
          {product.description}
        </Typography>
        <Chip
          label={`₹${product.price}`}
          size="small"
          sx={{
            bgcolor: "#f59e0b22",
            color: "#f59e0b",
            fontWeight: 700,
            border: "1px solid #f59e0b44",
          }}
        />
      </CardContent>
    </Card>
  );
}
