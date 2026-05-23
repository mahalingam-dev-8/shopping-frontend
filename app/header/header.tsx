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
import { AuthContext } from "../auth/auth-context";
import { MouseEvent, useContext, useState } from "react";
import Link from "next/link";
import { routes, unauthenticatedRoutes } from "../common/constants/routes";
import { useRouter } from "next/navigation";

interface HeaderProps {
  logout: () => Promise<void>;
}

export default function Header({ logout }: HeaderProps) {
  const isAuthenticated = useContext(AuthContext);
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = isAuthenticated ? routes : unauthenticatedRoutes;

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
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
                  onClick={() => { router.push(page.path); handleCloseNavMenu(); }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <ShoppingBasketIcon sx={{ color: "primary.main", display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h6"
            component="a"
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
                onClick={() => { router.push(page.path); handleCloseNavMenu(); }}
                sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
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

const Settings = ({ logout }: HeaderProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Account">
        <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
          <Avatar
            alt="User"
            sx={{ width: 36, height: 36, bgcolor: "#f59e0b22", color: "primary.main", border: "1px solid #f59e0b44" }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUser(null)}
      >
        <MenuItem
          onClick={async () => {
            await logout();
            setAnchorElUser(null);
          }}
          sx={{ gap: 1.5, color: "error.main" }}
        >
          <LogoutIcon fontSize="small" />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
