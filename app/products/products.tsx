import getproducts from "./actions/get-products";
import ProductsGrid from "./product-grid";
import { Box, Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import BoltIcon from "@mui/icons-material/Bolt";

export default async function Products() {
  const products = await getproducts();

  return (
    <Box sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          border: "1px solid #1f1f1f",
          background: "linear-gradient(135deg, #f59e0b1a 0%, #0a0a0a 65%)",
        }}
      >
        <Typography variant="h4" fontWeight={800}>
          Buy &amp; sell anything, securely.
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Discover products from independent sellers.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }} mt={2.5}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <LockIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">Secure checkout by Stripe</Typography>
          </Stack>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <BoltIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography variant="body2" color="text.secondary">Live stock updates</Typography>
          </Stack>
        </Stack>
      </Box>

      {/* An error response (e.g. backend down) is not a list; show the empty state instead of crashing. */}
      <ProductsGrid products={Array.isArray(products) ? products : []} />
    </Box>
  );
}
