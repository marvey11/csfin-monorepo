import { SingleSecurityQuoteResponse } from "@csfin-monorepo/core";

const transformEvaluationData = (
  data: {
    isin: string;
    securityName: string;
    exchanges: {
      name: string;
      quoteData: { price: string; date: string }[];
    }[];
  }[]
): SingleSecurityQuoteResponse[] =>
  data.map((item) => ({
    ...item,
    exchanges: item.exchanges.map((exchange) => ({
      ...exchange,
      quoteData: exchange.quoteData.map(({ date, price }) => ({
        price: parseFloat(price),
        date: new Date(date),
      })),
    })),
  }));

export { transformEvaluationData };
