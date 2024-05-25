import { twMerge } from "tailwind-merge";
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
  securityType,
  exchangeName,
  evaluation,
}: SecurityEvaluationBoxProps & SecurityEvaluation) => {
  const { latestQuote, sma200, sma200Previous, smaComp, rslDate, rslValue } =
    evaluation;

  return (
    <div
      className={twMerge(
        "flex flex-row justify-start gap-2 items-center border p-2 rounded-md shadow-md overflow-x-clip",
        {
          etf: "border-green-500 bg-green-100",
          stock: "border-blue-500 bg-blue-100",
        }[securityType]
      )}
    >
      <div
        className={twMerge(
          "rounded-md w-8 h-8 text-center align-middle shadow-md",
          {
            etf: "bg-green-200 border border-green-300",
            stock: "bg-blue-200 border border-blue-300",
          }[securityType]
        )}
      >
        <span
          className={twMerge(
            "text-xs leading-8 font-bold",
            {
              etf: "text-green-400",
              stock: "text-blue-400",
            }[securityType]
          )}
        >
          {index + 1}
        </span>
      </div>

      <div className="flex flex-col justify-around">
        {/* Title row */}
        <div className="flex flex-row justify-start items-center gap-4 overflow-x-clip">
          <span className="text-lg whitespace-nowrap overflow-x-clip text-ellipsis">
            {securityName}
          </span>
          <span className="text-xs uppercase">{securityType}</span>
          <span className="text-xs uppercase">{isin}</span>
        </div>

        {/* Evaluation content */}
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
