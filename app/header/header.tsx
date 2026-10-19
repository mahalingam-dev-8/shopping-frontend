
"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { AuthContext } from "../auth/auth-context";
import { AdminContext } from "../auth/admin-context";
import { UserContext } from "../auth/user-context";
import { MouseEvent, useContext, useState } from "react";
import Link from "next/link";
import { adminRoutes, routes, unauthenticatedRoutes } from "../common/constants/routes";
import { usePathname } from "next/navigation";

interface HeaderProps {
  logout: () => Promise<void>;
}

export default function Header({ logout }: HeaderProps) {
  const isAuthenticated = useContext(AuthContext);
  const isAdmin = useContext(AdminContext);
  const pathname = usePathname();
  const isActive = (path: string) => (path === "/" ? pathname === "/" : pathname.startsWith(path));

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = isAuthenticated
    ? [...routes, ...(isAdmin ? adminRoutes : [])]
    : unauthenticatedRoutes;

  return (
    <AppBar position="sticky">
      {/* Same width as the page Container in layout.tsx, so the logo lines up with the content. */}
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <ShoppingBasketIcon sx={{ color: "primary.main", display: { xs: "none", md: "flex" } }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".2rem",
              color: "primary.main",
              textDecoration: "none",
              mr: 4,
            }}
          >
            SHOPPY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  component={Link}
                  href={page.path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <ShoppingBasketIcon sx={{ color: "primary.main", display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h6"
            component={Link}
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".2rem",
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            SHOPPY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                href={page.path}
                sx={{
                  color: isActive(page.path) ? "text.primary" : "text.secondary",
                  borderRadius: 0,
                  borderBottom: "2px solid",
                  borderColor: isActive(page.path) ? "primary.main" : "transparent",
                  "&:hover": { color: "text.primary", bgcolor: "transparent" },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {isAuthenticated && <Settings logout={logout} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const roleChipSx = (isAdmin: boolean) =>
  isAdmin
    ? { bgcolor: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44", fontWeight: 600 }
    : { bgcolor: "#3b82f622", color: "#60a5fa", border: "1px solid #3b82f644", fontWeight: 600 };

const UserAvatar = ({ email, size }: { email?: string; size: number }) => (
  <Avatar
    alt={email ?? "User"}
    sx={{ width: size, height: size, bgcolor: "#f59e0b22", color: "primary.main", border: "1px solid #f59e0b44", fontWeight: 700 }}
  >
    {/* A letter initial; for emails starting with a digit, Avatar's default person icon. */}
    {email && /^[a-z]/i.test(email) ? email.charAt(0).toUpperCase() : null}
  </Avatar>
);

const Settings = ({ logout }: HeaderProps) => {
  const isAdmin = useContext(AdminContext);
  const user = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const closeMenu = () => setAnchorElUser(null);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Account">
        <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
          <UserAvatar email={user?.email} size={36} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 280,
            bgcolor: "#141414",
            border: "1px solid #262626",
            borderRadius: 2,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          },
        }}
      >
        {user && (
          <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.5 }}>
            <UserAvatar email={user.email} size={40} />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap title={user.email}>
                {user.email}
              </Typography>
              <Chip
                label={isAdmin ? "Admin" : "Customer"}
                size="small"
                sx={{ ...roleChipSx(isAdmin), mt: 0.5, height: 20, fontSize: 11 }}
              />
            </Box>
          </Box>
        )}
        {user && <Divider />}
        <MenuItem component={Link} href="/orders" onClick={closeMenu}>
          <ListItemIcon><ReceiptLongIcon fontSize="small" /></ListItemIcon>
          My orders
        </MenuItem>
        {isAdmin && (
          <MenuItem component={Link} href="/sales" onClick={closeMenu}>
            <ListItemIcon><StorefrontIcon fontSize="small" /></ListItemIcon>
            Sales
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={async () => {
            setAnchorElUser(null);
            await logout();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon sx={{ color: "inherit" }}><LogoutIcon fontSize="small" /></ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </Box>
  );
};
