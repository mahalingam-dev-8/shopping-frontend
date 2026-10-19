/** ₹1,299.00 — one format for every price in the app. */
export const formatInr = (amount: number | string) =>
  Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
