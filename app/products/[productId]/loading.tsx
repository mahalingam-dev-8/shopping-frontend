import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ pt: 4 }}>
      <Skeleton variant="text" width={80} height={36} sx={{ mb: 2 }} />
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <Skeleton variant="rounded" sx={{ paddingTop: "100%" }} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack spacing={2} justifyContent="center" height="100%">
            <Skeleton variant="text" width="70%" height={48} />
            <Skeleton variant="text" width="30%" height={36} />
            <Skeleton variant="rounded" height={96} />
            <Skeleton variant="rounded" width={220} height={44} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
