import { Box, Container, Link, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid #1f1f1f", mt: 8, py: 3 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={1}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Shoppy · Spring Boot, Next.js, Stripe &amp; AWS
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="https://github.com/mahalingam-dev-8" target="_blank" rel="noopener" color="text.secondary" underline="hover" variant="body2">
              GitHub
            </Link>
            <Link href="https://mahalingam-portfolio.vercel.app" target="_blank" rel="noopener" color="text.secondary" underline="hover" variant="body2">
              Portfolio
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
