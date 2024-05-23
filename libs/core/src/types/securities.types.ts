enum SecurityType {
  STOCK = "stock",
  ETF = "etf",
}

interface SecurityData {
  isin: string;
  nsin: string;
  name: string;
  shortName?: string;
  type: SecurityType;
}

export { SecurityType };
export type { SecurityData };
