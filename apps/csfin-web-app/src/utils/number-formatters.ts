const convertToNumber = (value: string | number) =>
  parseFloat(value.toString());

const formatCurrency = (
  locale: Intl.LocalesArgument,
  currency: string,
  value: number | string
) =>
  Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(convertToNumber(value));

const formatFixedPrecision = (
  locale: Intl.LocalesArgument,
  value: number | string,
  precision: number
) =>
  Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(convertToNumber(value));

export { formatCurrency, formatFixedPrecision };
