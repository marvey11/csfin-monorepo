import { QuoteData } from "./quote-types";

interface SecurityEvaluation {
  isin: string;
  exchangeName: string;
  evaluation: EvaluationData;
}

interface EvaluationData {
  latestQuote: QuoteData;
  sma200: number;
  sma200Previous: number;
  smaComp: number;
}

export type { EvaluationData, SecurityEvaluation };
