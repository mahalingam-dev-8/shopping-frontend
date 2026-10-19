"use client";

import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

const POLL_INTERVAL_MS = 3000;
const REQUEST_TIMEOUT_MS = 10_000;
// Typical free-tier cold start, used only to pace the progress bar.
const EXPECTED_WAKE_SECONDS = 60;
const GIVE_UP_SECONDS = 180;

/**
 * Shown instead of the app while the backend is asleep. Polls the health endpoint from the
 * browser and reloads the page once the backend answers, so the store opens by itself.
 */
export default function ServerWakeScreen() {
  const [elapsed, setElapsed] = useState(0);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const started = Date.now();
    const tick = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);

    const poll = async () => {
      while (!cancelled) {
        try {
          const res = await fetch(`${API_URL}/`, {
            cache: "no-store",
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          });
          if (res.ok) {
            clearInterval(tick);
            window.location.reload();
            return;
          }
        } catch {
          // Still starting; try again.
        }
        if (Date.now() - started > GIVE_UP_SECONDS * 1000) {
          clearInterval(tick);
          if (!cancelled) setFailed(true);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
      }
    };
    poll();

    return () => {
      cancelled = true;
      clearInterval(tick);
    };
  }, [attempt]);

  if (failed) {
    return (
      <Stack alignItems="center" justifyContent="center" textAlign="center" spacing={2} sx={{ minHeight: "100vh", px: 2 }}>
        <Typography variant="h5">The server didn&apos;t respond</Typography>
        <Typography color="text.secondary" maxWidth={420}>
          It may still be starting or temporarily unavailable. Please try again in a moment.
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            setFailed(false);
            setElapsed(0);
            setAttempt((a) => a + 1);
          }}
        >
          Try again
        </Button>
      </Stack>
    );
  }

  const progress = Math.min(95, (elapsed / EXPECTED_WAKE_SECONDS) * 100);

  return (
    <Stack alignItems="center" justifyContent="center" textAlign="center" spacing={2} sx={{ minHeight: "100vh", px: 2 }}>
      <ShoppingBasketIcon sx={{ fontSize: 48, color: "primary.main" }} />
      <Typography variant="h5">Waking up the server…</Typography>
      <Typography color="text.secondary" maxWidth={440}>
        Shoppy&apos;s backend runs on a server that sleeps when idle. The first visit takes about
        30–60 seconds, and the store opens automatically when it&apos;s ready.
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: "100%", maxWidth: 360, height: 6, borderRadius: 3, mt: 1 }}
      />
      <Typography variant="caption" color="text.secondary">
        {elapsed < 90 ? `${elapsed}s` : `${elapsed}s · still starting, almost there`}
      </Typography>
    </Stack>
  );
}
