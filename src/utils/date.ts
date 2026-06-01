export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

export function isWarrantyActive(expiry: string | null) {
  if (!expiry) return false;
  return new Date(expiry).getTime() > Date.now();
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
}
