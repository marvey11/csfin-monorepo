enum TransactionType {
  BUY = "buy",
  SELL = "sell",
}

interface TransactionData {
  isin: string;
  type: TransactionType;
  date: Date;
  shares: number;
  price: number;
}

export { TransactionType };
export type { TransactionData };
