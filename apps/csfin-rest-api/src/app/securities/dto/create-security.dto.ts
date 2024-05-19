export enum SecurityType {
  STOCK = "stock",
  ETF = "etf",
}

export class CreateSecurityDto {
  isin: string;
  nsin: string;
  name: string;
  shortName?: string;
  type: SecurityType;
}
