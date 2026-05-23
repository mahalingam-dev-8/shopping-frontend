import getproducts from "./actions/get-products";
import ProductsGrid from "./product-grid";
import { Box, Typography } from "@mui/material";

export default async function Products() {
  const products = await getproducts();

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "baseline", gap: 1.5 }}>
        <Typography variant="h5" fontWeight={700}>Products</Typography>
        <Typography variant="body2" color="text.secondary">{products.length} items</Typography>
      </Box>
      <ProductsGrid products={products} />
    </Box>
  );
}
