"use client";

import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
}

/** Form submit button that disables itself and shows progress while the server action runs. */
export default function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="contained" fullWidth size="large" disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
