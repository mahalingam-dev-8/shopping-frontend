"use client";

import { Button, Card, CardContent, Divider, Stack, TextField, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import login from "./login";

export default function Login() {
  const router = useRouter();
  const [state, formAction] = useFormState(login, { error: "", success: false });

  useEffect(() => {
    if (state?.success) router.push("/");
  }, [state?.success]);

  return (
    <Card sx={{ width: 400, p: 1 }}>
      <CardContent>
        <Stack spacing={3}>
          <Stack alignItems="center" spacing={1} pt={1}>
            <ShoppingBasketIcon sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h5">Shoppy</Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your account
            </Typography>
          </Stack>

          <Divider />

          <form action={formAction}>
            <Stack spacing={2}>
              <TextField
                error={!!state?.error}
                helperText={state?.error}
                name="email"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                error={!!state?.error}
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
              <Button type="submit" variant="contained" fullWidth size="large">
                Sign In
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don&apos;t have an account?{" "}
            <NextLink href="/auth/signup" style={{ color: "#f59e0b", textDecoration: "none", fontWeight: 600 }}>
              Sign up
            </NextLink>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
