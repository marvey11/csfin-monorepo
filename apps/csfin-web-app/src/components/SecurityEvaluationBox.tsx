import { twMerge } from "tailwind-merge";
import { SecurityEvaluation } from "../types";
import { formatCurrency, formatDate, formatFixedPrecision } from "../utils";
import { ComparisonIcon } from "./ComparisonIcon";

export const SecurityEvaluationBox = ({
  isin,
  securityName,
  exchangeName,
  evaluation,
}: SecurityEvaluation) => {
  const { latestQuote, sma200, sma200Previous, smaComp } = evaluation;

  return (
    <div className="flex flex-col justify-around border p-2 rounded-md border-blue-500 bg-blue-100">
      <span className="text-lg whitespace-nowrap overflow-x-clip text-ellipsis">
        {securityName}&nbsp;({isin})
      </span>
      <div
        key={`${isin}-${exchangeName}`}
        className="flex flex-row justify-start items-center"
      >
        <span className="mr-4">{exchangeName}</span>

        <span className="mr-4">
          Latest:&nbsp;
          <span className="w-24 text-end inline-block">
            {formatCurrency("de-DE", "EUR", latestQuote.price)}
          </span>
          <span className="text-neutral-500 w-20 text-end inline-block italic text-xs">
            ({formatDate("de-DE", latestQuote.date)})
          </span>
        </span>

        <span className="mr-4">
          SMA-200:&nbsp;
          <span className="w-20 text-end inline-block">
            {formatFixedPrecision("de-DE", sma200, 3)}
          </span>
        </span>
        <span className="mr-4">
          <ComparisonIcon
            current={sma200}
            previous={sma200Previous}
            className="w-6"
          />
        </span>
        <span className="mr-4">
          SMA&nbsp;Comp:&nbsp;
          <span
            className={twMerge(
              "w-20 text-end inline-block font-bold",
              getSMACompColor(smaComp)
            )}
          >
            {formatFixedPrecision("de-DE", smaComp, 4)}
          </span>
        </span>
      </div>
    </div>
  );
};

const getSMACompColor = (smaComp: number) => {
  if (smaComp > 1.05) {
    return "text-green-500";
  }

  if (smaComp < 1) {
    return "text-red-500";
  }

  return "text-neutral-500";
};
