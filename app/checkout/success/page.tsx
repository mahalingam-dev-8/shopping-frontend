import { Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CheckoutSuccess() {
  return (
    <Stack alignItems="center" textAlign="center" spacing={2} py={10}>
      <CheckCircleIcon sx={{ fontSize: 72, color: "#4ade80" }} />
      <Typography variant="h4">Payment successful</Typography>
      <Typography color="text.secondary" maxWidth={440}>
        Thanks for your order. It will appear in My Orders in a few seconds, once Stripe
        confirms the payment.
      </Typography>
      <Stack direction="row" spacing={2} pt={1}>
        <Button variant="contained" href="/orders">View my orders</Button>
        <Button variant="outlined" href="/">Continue shopping</Button>
      </Stack>
    </Stack>
  );
}
