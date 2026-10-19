import { Box, Skeleton, Stack } from "@mui/material";

/** Loading placeholder for the table pages (My Orders, Sales). */
export default function TableSkeleton() {
  return (
    <Box sx={{ py: 4 }}>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
      <Stack spacing={1}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={52} />
        ))}
      </Stack>
    </Box>
  );
}
