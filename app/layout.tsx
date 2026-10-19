import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container, CssBaseline } from "@mui/material";
import Header from "./header/header";
import Providers from "./providers";
import authenticated from "./auth/authenticated";
import logout from "./auth/logout";
import getMe from "./get-me";
import { CurrentUser } from "./auth/user-context";
import Footer from "./common/components/footer";
import NextTopLoader from "nextjs-toploader";
import ServerWakeScreen from "./common/components/server-wake-screen";
import { isBackendAwake } from "./common/util/backend-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppy",
  description: "Buy and sell products with secure Stripe checkout",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // While the free-tier backend is asleep, every server render would hang for up to a minute.
  // Show the wake-up screen instead; it reloads the page once the backend answers.
  if (!(await isBackendAwake())) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Providers authenticated={false} isAdmin={false} user={null}>
            <CssBaseline />
            <ServerWakeScreen />
          </Providers>
        </body>
      </html>
    );
  }

  const isAuthenticated = authenticated();
  let user: CurrentUser | null = null;
  if (isAuthenticated) {
    const me = await getMe() as Partial<CurrentUser>;
    // An expired or invalid token returns an error body instead of a user.
    user = me?.email ? (me as CurrentUser) : null;
  }
  const isAdmin = user?.role === "ADMIN";

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Thin amber bar at the top on every navigation, so clicks give instant feedback. */}
        <NextTopLoader color="#f59e0b" height={3} showSpinner={false} shadow="0 0 10px #f59e0b" />
        <Providers authenticated={isAuthenticated} isAdmin={isAdmin} user={user}>
          <CssBaseline />
          <Header logout={logout} />
          {/* flex: 1 pushes the footer to the bottom on short pages (body is a flex column). */}
          <Container maxWidth="lg" sx={{ flex: 1 }}>{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
