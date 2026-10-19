import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import gproduct from "./product"
import Image from "next/image";
import { notFound } from "next/navigation";
import Checkout from "@/app/checkout/checkout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BackButton from "./back-button";
import { formatInr } from "@/app/common/util/format";

interface SingleProductProps {
  params: { productId: string }
}

export default async function ({ params }: SingleProductProps) {
  const product = await gproduct(+params.productId);
  // The backend answers an unknown id with an error body, not a product.
  if (!product?.id) notFound();

  return (
    <Box sx={{ pt: 4 }}>
    <BackButton />
    <Grid container spacing={6} sx={{ pb: 6 }}>
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
        <Stack gap={2.5} justifyContent="center" height="100%">
          {product.sold && (
            <Chip
              label="Sold out"
              size="small"
              sx={{ alignSelf: "flex-start", bgcolor: "#dc262622", color: "#f87171", border: "1px solid #dc262644", fontWeight: 600 }}
            />
          )}
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            {formatInr(product.price)}
          </Typography>
          <Divider />
          <Typography color="text.secondary" variant="body1" lineHeight={1.8}>
            {product.description}
          </Typography>
          <Checkout productid={product.id} sold={product.sold} ownerId={product.userid} />
        </Stack>
      </Grid>
    </Grid>
    </Box>
  );
}
