import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import gproduct from "./product"
import Image from "next/image";
import Checkout from "@/app/checkout/checkout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

interface SingleProductProps {
  params: { productId: string }
}

export default async function ({ params }: SingleProductProps) {
  const product = await gproduct(+params.productId);

  return (
    <Grid container spacing={6} sx={{ py: 6 }}>
      <Grid item md={6} xs={12}>
        <Box
          sx={{
            position: "relative",
            paddingTop: "100%",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#0d0d0d",
            border: "1px solid #1f1f1f",
          }}
        >
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
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
              <ShoppingBagIcon sx={{ fontSize: 96, color: "#2a2a2a" }} />
            </Box>
          )}
        </Box>
      </Grid>

      <Grid item md={6} xs={12}>
        <Stack gap={3} justifyContent="center" height="100%">
          <Typography variant="h4">{product.name}</Typography>
          <Divider />
          <Typography color="text.secondary" variant="body1" lineHeight={1.8}>
            {product.description}
          </Typography>
          <Chip
            label={`₹${product.price}`}
            sx={{
              alignSelf: "flex-start",
              fontSize: "1.25rem",
              height: 40,
              px: 1,
              bgcolor: "#f59e0b22",
              color: "#f59e0b",
              fontWeight: 700,
              border: "1px solid #f59e0b44",
            }}
          />
          <Checkout productid={product.id} />
        </Stack>
      </Grid>
    </Grid>
  );
}
