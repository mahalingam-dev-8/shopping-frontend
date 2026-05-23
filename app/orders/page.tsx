import {
  Box, Chip, Paper, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import getOrders, { Order } from "./actions/get-orders";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const soldChip = (sold: boolean) =>
  sold
    ? { bgcolor: "#16a34a22", color: "#4ade80", border: "1px solid #16a34a44", label: "Completed" }
    : { bgcolor: "#d9770622", color: "#fb923c", border: "1px solid #d9770644", label: "Pending" };

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <Box sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <ReceiptLongIcon sx={{ color: "primary.main" }} />
        <Typography variant="h5" fontWeight={700}>My Orders</Typography>
        <Typography variant="body2" color="text.secondary">{orders.length} orders</Typography>
      </Stack>

      {orders.length === 0 ? (
        <Stack alignItems="center" spacing={2} py={10}>
          <ShoppingBagIcon sx={{ fontSize: 64, color: "#2a2a2a" }} />
          <Typography color="text.secondary">No orders yet</Typography>
        </Stack>
      ) : (
        <TableContainer component={Paper} sx={{ border: "1px solid #1f1f1f" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { color: "text.secondary", fontWeight: 600, borderColor: "#1f1f1f" } }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: Order) => (
                <TableRow
                  key={order.id}
                  sx={{ "& td": { borderColor: "#1f1f1f" }, "&:last-child td": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">#{order.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {order.product?.name ?? `Product #${order.productId}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="primary.main">
                      ₹{order.product?.price ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {(() => { const s = soldChip(order.product?.sold ?? false); return (
                      <Chip label={s.label} size="small" sx={{ bgcolor: s.bgcolor, color: s.color, border: s.border, fontWeight: 600 }} />
                    ); })()}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
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
