"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactElement } from "react";
import darkTheme from "./dark.theme";
import { AuthContext } from "./auth/auth-context";
import { AdminContext } from "./auth/admin-context";
import { CurrentUser, UserContext } from "./auth/user-context";

interface ProviderProps {
  children: ReactElement[];
  authenticated: boolean;
  isAdmin: boolean;
  user: CurrentUser | null;
}

export default function Providers({ children, authenticated, isAdmin, user }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={authenticated}>
          <AdminContext.Provider value={isAdmin}>
            <UserContext.Provider value={user}>
              {children}
            </UserContext.Provider>
          </AdminContext.Provider>
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
