interface SingleSecurityQuoteResponse {
  isin: string;
  exchanges: ExchangeResponse[];
}

interface ExchangeResponse {
  name: string;
  quoteData: QuoteData[];
}

interface QuoteData {
  date: string;
  price: number | string;
}

export type { ExchangeResponse, QuoteData, SingleSecurityQuoteResponse };
