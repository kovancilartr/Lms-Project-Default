export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("tr-TR", {
    currency: "TRY",
    currencyDisplay: "code",
    style: "currency",
  }).format(price);
};
