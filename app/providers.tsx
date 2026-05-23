"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactElement } from "react";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";
import { AdminContext } from "./auth/admin-context";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
  isAdmin: boolean;
}

export default function Providers({ children, authenticated, isAdmin }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          <AdminContext.Provider value={isAdmin}>
            {children}
          </AdminContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
