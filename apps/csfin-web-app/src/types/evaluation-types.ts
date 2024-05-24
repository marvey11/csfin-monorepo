import { QuoteDataItem } from "@csfin-monorepo/core";

interface SecurityEvaluation {
  isin: string;
  securityName: string;
  exchangeName: string;
  evaluation: EvaluationData;
}

interface EvaluationData {
  latestQuote: QuoteDataItem;

  sma200: number;
  sma200Previous: number;
  smaComp: number;

  rslDate: Date;
  rslValue: number;
}

export type { EvaluationData, SecurityEvaluation };
