"use client";

import {
  Button, Card, CardContent, Divider, Stack,
  TextField, Typography, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import createUser from "./create-user";

export default function Signup() {
  const router = useRouter();
  const [state, formAction] = useFormState(createUser, { error: "", success: false });
  const [role, setRole] = useState("USER");

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
              Create your account
            </Typography>
          </Stack>

          <Divider />

          <form action={formAction}>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                helperText={state?.error}
                error={!!state?.error}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                error={!!state?.error}
              />

              <input type="hidden" name="role" value={role} />

              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  I am a...
                </Typography>
                <ToggleButtonGroup
                  value={role}
                  exclusive
                  onChange={(_, val) => val && setRole(val)}
                  fullWidth
                >
                  <ToggleButton
                    value="USER"
                    sx={{
                      gap: 1,
                      "&.Mui-selected": {
                        bgcolor: "#f59e0b22",
                        color: "#f59e0b",
                        borderColor: "#f59e0b44",
                      },
                    }}
                  >
                    <PersonIcon fontSize="small" />
                    Customer
                  </ToggleButton>
                  <ToggleButton
                    value="ADMIN"
                    sx={{
                      gap: 1,
                      "&.Mui-selected": {
                        bgcolor: "#f59e0b22",
                        color: "#f59e0b",
                        borderColor: "#f59e0b44",
                      },
                    }}
                  >
                    <AdminPanelSettingsIcon fontSize="small" />
                    Admin
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              <Button type="submit" variant="contained" fullWidth size="large">
                Create Account
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Already have an account?{" "}
            <NextLink href="/auth/login" style={{ color: "#f59e0b", textDecoration: "none", fontWeight: 600 }}>
              Sign in
            </NextLink>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
