import { SecurityEvaluation } from "../types";
import { formatCurrency, formatDate, formatFixedPrecision } from "../utils";
import { ComparisonIcon } from "./ComparisonIcon";

interface SecurityEvaluationBoxProps {
  index: number;
}

export const SecurityEvaluationBox = ({
  index,
  isin,
  securityName,
  exchangeName,
  evaluation,
}: SecurityEvaluationBoxProps & SecurityEvaluation) => {
  const { latestQuote, sma200, sma200Previous, smaComp, rslDate, rslValue } =
    evaluation;

  return (
    <div className="flex flex-row justify-start gap-2 items-center border p-2 rounded-md border-blue-500 bg-blue-100">
      <div className="rounded-md bg-blue-200 border border-blue-500 w-10 h-10 text-center align-middle shadow-md">
        <span className="leading-10 font-bold text-blue-400">{index + 1}</span>
      </div>
      <div className="flex flex-col justify-around">
        <span className="text-lg whitespace-nowrap overflow-x-clip text-ellipsis">
          {securityName}&nbsp;({isin})
        </span>
        <div className="flex flex-row justify-start items-center">
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
            <span className="w-20 text-end inline-block font-bold">
              {formatFixedPrecision("de-DE", smaComp, 4)}
            </span>
          </span>

          <span className="mr-4">
            RSL:&nbsp;
            <span className="w-20 text-end inline-block font-bold">
              {formatFixedPrecision("de-DE", rslValue, 4)}
            </span>
            <span className="text-neutral-500 w-20 text-end inline-block italic text-xs">
              ({formatDate("de-DE", rslDate)})
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
