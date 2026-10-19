import {
  Box, Paper, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import getSales, { Sale } from "./actions/get-sales";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LockIcon from "@mui/icons-material/Lock";
import { formatInr } from "../common/util/format";

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <Paper sx={{ flex: 1, p: 2.5, border: "1px solid #1f1f1f" }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="h5" fontWeight={700} color="primary.main" mt={0.5}>{value}</Typography>
  </Paper>
);

export default async function SalesPage() {
  const sales = await getSales();

  if (sales === null) {
    return (
      <Stack alignItems="center" spacing={2} py={10}>
        <LockIcon sx={{ fontSize: 56, color: "#2a2a2a" }} />
        <Typography color="text.secondary">Only admins can view sales.</Typography>
      </Stack>
    );
  }

  const revenue = sales.reduce((sum, sale) => sum + Number(sale.product.price), 0);
  const buyers = new Set(sales.map((sale) => sale.user.id)).size;

  return (
    <Box sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <StorefrontIcon sx={{ color: "primary.main" }} />
        <Typography variant="h5" fontWeight={700}>Sales</Typography>
        <Typography variant="body2" color="text.secondary">orders for your products</Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <StatCard label="Revenue" value={formatInr(revenue)} />
        <StatCard label="Orders" value={String(sales.length)} />
        <StatCard label="Customers" value={String(buyers)} />
      </Stack>

      {sales.length === 0 ? (
        <Stack alignItems="center" spacing={2} py={10}>
          <ShoppingBagIcon sx={{ fontSize: 64, color: "#2a2a2a" }} />
          <Typography color="text.secondary">No sales yet. List a product with the + button.</Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ border: "1px solid #1f1f1f" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { color: "text.secondary", fontWeight: 600, borderColor: "#1f1f1f" } }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale: Sale) => (
                <TableRow
                  key={sale.id}
                  sx={{ "& td": { borderColor: "#1f1f1f" }, "&:last-child td": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">#{sale.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>{sale.product.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{sale.user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      {formatInr(sale.product.price)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(sale.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
