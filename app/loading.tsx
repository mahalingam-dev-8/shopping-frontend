import { Box, Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

/** Shown while a page's data loads: the hero, then a grid of card placeholders. */
export default function Loading() {
  return (
    <Box sx={{ py: 4 }}>
      <Skeleton variant="rounded" height={150} sx={{ mb: 4 }} />
      <Skeleton variant="text" width={160} height={40} sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} xs={12} sm={6} lg={4}>
            <Stack spacing={1}>
              <Skeleton variant="rounded" sx={{ paddingTop: "60%" }} />
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="40%" />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
