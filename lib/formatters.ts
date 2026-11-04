export const formatCurrency = (
  value: number | string | null | undefined
) =>
  new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value || 0));

export const formatNumber = (
  value: number | string | null | undefined
) =>
  new Intl.NumberFormat("de-AT").format(
    Number(value || 0)
  );