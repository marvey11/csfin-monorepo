import { EvaluationData, QuoteData } from "../types";

const getEvaluatedQuoteData = (data: QuoteData[]): EvaluationData => {
  const temp = [...data].map((item) => ({
    ...item,
    price: parseFloat(item.price.toString()),
  }));
  temp.sort((a, b) => (a.date < b.date ? 1 : -1));

  const latestQuote = temp[0];

  const sumCore = temp.slice(1, 200).reduce((sum, { price }) => sum + price, 0);
  const sumLatest = sumCore + latestQuote.price;
  const sumOld = sumCore + temp[temp.length - 1].price;

  const sma200 = sumLatest / 200;
  const sma200Previous = sumOld / 200;

  const smaComp = latestQuote.price / sma200;

  return { latestQuote, sma200, sma200Previous, smaComp };
};

export { getEvaluatedQuoteData };
