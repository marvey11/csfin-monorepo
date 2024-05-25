import { QuoteDataItem, SecurityType } from "../../types";

interface SingleSecurityQuoteResponse {
  isin: string;
  securityName: string;
  securityType: SecurityType;
  exchanges: ExchangeResponse[];
}

interface ExchangeResponse {
  name: string;
  quoteData: QuoteDataItem[];
}

export type { ExchangeResponse, SingleSecurityQuoteResponse };
