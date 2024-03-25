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

export function parsePrice(stringNumber: string, precision = 2) {
  if (stringNumber === "€") return null;
  console.log(
    "r: ",
    currency(stringNumber, {
      symbol: "€",
      separator: ".",
      decimal: ",",
      precision,
    }),
  );
  return currency(stringNumber, {
    symbol: "€",
    separator: ".",
    decimal: ",",
    precision,
  }).value;
}

export const moneyTransformer = {
  input: (value: number) => {
    if (isNaN(value) || value === 0) return "";
    return formatPrice(value);
  },
  output: (e: React.ChangeEvent<HTMLInputElement>) =>
    parsePrice(e.target.value),
};

export const numberTransformer = {
  input: (value: number) => {
    if (isNaN(value) || value === 0) return "";
    return value.toString();
  },
  output: (e: React.ChangeEvent<HTMLInputElement>) => Number(e.target.value),
};
