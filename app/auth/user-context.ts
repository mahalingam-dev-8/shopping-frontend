import { createContext } from "react";

export interface CurrentUser {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
}

/** The logged-in user from GET /users/me, or null when logged out. */
export const UserContext = createContext<CurrentUser | null>(null);
