export function generateOrderId() {
  const now = new Date();
  const date = now.toISOString().split("T")[0].replace(/-/g, "");
  const random = Math.floor(100 + Math.random() * 900);

  return `MK-${date}-${random}`;
}
