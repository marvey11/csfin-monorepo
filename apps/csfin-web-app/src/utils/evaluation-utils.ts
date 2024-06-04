import { QuoteDataItem, lastItem } from "@csfin-monorepo/core";
import { EvaluationData } from "../types";

const getEvaluatedQuoteData = (data: QuoteDataItem[]): EvaluationData => {
  const temp = [...data];
  temp.sort((a, b) => (a.date < b.date ? 1 : -1));

  const latestQuote = temp[0];

  const calculateSMA200 = () => {
    const sumCore = temp
      .slice(1, 200)
      .reduce((sum, { price }) => sum + price, 0);

    const sumLatest = sumCore + latestQuote.price;
    const sumOld = sumCore + lastItem(temp).price;

    const sma200 = sumLatest / 200;
    const sma200Previous = sumOld / 200;

    const smaComp = latestQuote.price / sma200;

    return { sma200, sma200Previous, smaComp };
  };

  const calculateRSL = () => {
    const latest = latestQuote.date;
    const refFriday = new Date(latest);
    refFriday.setDate(latest.getDate() + ((5 - latest.getDay()) % 7));

    const weekArray: QuoteDataItem[] = [];

    for (const weeknum of Array(27).keys()) {
      const friday = new Date(refFriday);
      friday.setDate(refFriday.getDate() - 7 * weeknum);
      const filteredQuotes = temp.filter(({ date }) => date <= friday);
      if (filteredQuotes.length > 0) {
        filteredQuotes.sort((a, b) => (a.date < b.date ? 1 : -1));
        weekArray.push(filteredQuotes[0]);
      }
    }

    weekArray.sort((a, b) => (a.date < b.date ? 1 : -1));
    const { price } = weekArray[0];
    const rslValue =
      (price * weekArray.length) /
      weekArray.reduce((sum, curr) => sum + curr.price, 0);

    return { rslValue };
  };

  return { latestQuote, ...calculateSMA200(), ...calculateRSL() };
};

export { getEvaluatedQuoteData };
