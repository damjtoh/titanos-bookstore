import currency from "currency.js";

export const formatPrice = (price: number | null, precision = 2) => {
  if (price === null) return "";
  return currency(price, {
    symbol: "€",
    separator: ".",
    decimal: ",",
    precision,
  }).format();
};

export const numberTransformer = {
  input: (value: number) => {
    if (isNaN(value) || value === 0) return "";
    return value.toString();
  },
  output: (e: React.ChangeEvent<HTMLInputElement>) => Number(e.target.value),
};
