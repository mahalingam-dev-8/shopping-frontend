export const unauthenticatedRoutes = [
  {
    title: "Login",
    path: "/auth/login",
  },
  {
    title: "Signup",
    path: "/auth/signup",
  },
];

export const routes = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My Orders",
    path: "/orders",
  },
];

// Shown only to admins (sellers), in addition to `routes`.
export const adminRoutes = [
  {
    title: "Sales",
    path: "/sales",
  },
];
