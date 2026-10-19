"use client"

import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useContext, useState } from "react";
import { UserContext } from "../auth/user-context";
import checkout from "./actions/checkout"
import getstripe from "./stripe";

interface CheckoutProps {
    productid: number;
    sold: boolean;
    /** The seller's user id, to stop sellers buying their own listing. */
    ownerId: number;
}

export default function Checkout({ productid, sold, ownerId }: CheckoutProps)
{
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const blockedReason = sold ? "Sold out" : user?.id === ownerId ? "This is your listing" : "";

    const handleCheckout = async () => {
        setLoading(true);
        const origin = window.location.origin;
        const { error, data } = await checkout(
            productid,
            `${origin}/checkout/success`,
            `${origin}/products/${productid}`,
        );
        if (error) {
            setError(error);
            setLoading(false);
            return;
        }
        // The session includes Stripe's hosted checkout URL; Stripe.js is only a fallback.
        if (data.url) {
            window.location.href = data.url;
            return;
        }
        const stripe = await getstripe();
        await stripe?.redirectToCheckout({ sessionId: data.id });
        setLoading(false);
    };

    return (
        <Stack spacing={1.5} alignItems="flex-start">
            <Button
                variant="contained"
                size="large"
                onClick={handleCheckout}
                disabled={!!blockedReason || loading}
                sx={{ minWidth: 220 }}
            >
                {blockedReason || (loading ? "Redirecting to Stripe..." : "Buy Now")}
            </Button>
            <Stack direction="row" spacing={0.75} alignItems="center" sx={{ color: "text.secondary" }}>
                <LockIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">Secure checkout by Stripe</Typography>
            </Stack>
            <Snackbar
                open={!!error}
                autoHideDuration={5000}
                onClose={() => setError("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="error" variant="filled" onClose={() => setError("")}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
