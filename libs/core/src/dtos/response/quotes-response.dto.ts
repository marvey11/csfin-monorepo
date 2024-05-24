import { QuoteDataItem } from "../../types";

interface SingleSecurityQuoteResponse {
  isin: string;
  securityName: string;
  exchanges: ExchangeResponse[];
}

interface ExchangeResponse {
  name: string;
  quoteData: QuoteDataItem[];
}

export type { ExchangeResponse, SingleSecurityQuoteResponse };
