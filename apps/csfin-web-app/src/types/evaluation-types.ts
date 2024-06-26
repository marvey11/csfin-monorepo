import { QuoteDataItem, SecurityType } from "@csfin-monorepo/core";

interface SecurityEvaluation {
  isin: string;
  securityName: string;
  securityType: SecurityType;
  exchangeName: string;
  evaluation: EvaluationData;
}

interface EvaluationData {
  latestQuote: QuoteDataItem;

  sma200: number;
  sma200Previous: number;
  smaComp: number;

  rslValue: number;
}

export type { EvaluationData, SecurityEvaluation };
