import { SingleSecurityQuoteResponse } from "@csfin-monorepo/core";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/16/solid";
import axios, { AxiosResponseTransformer } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SecurityEvaluationBox } from "../../components";
import useAxios from "../../hooks/useAxios";
import useSortDirection from "../../hooks/useSortDirection";
import { SecurityEvaluation } from "../../types";
import { getEvaluatedQuoteData, transformEvaluationData } from "../../utils";

const evaluationSortColumns = ["securityName", "smaComp", "rslValue"] as const;
type SortColumn = (typeof evaluationSortColumns)[number];

export const SecurityEvaluationPage = () => {
  const [sortColum, setSortColumn] = useState<SortColumn>("rslValue");

  const { sortDirection, toggleSortDirection } = useSortDirection("desc");
  const { data, sendRequest } = useAxios<SingleSecurityQuoteResponse[]>();

  useEffect(() => {
    sendRequest({
      url: "/quotes?limit=201",
      method: "get",
      transformResponse: [
        ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
        transformEvaluationData,
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const compareFn = useCallback(
    (one: SecurityEvaluation, two: SecurityEvaluation) => {
      const compare = <T extends string | number>(a: T, b: T) => {
        if (a === b) return 0;
        return (a > b ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
      };

      return {
        rslValue: compare(one.evaluation.rslValue, two.evaluation.rslValue),
        smaComp: compare(one.evaluation.smaComp, two.evaluation.smaComp),
        securityName: compare(one.securityName, two.securityName),
      }[sortColum];
    },
    [sortColum, sortDirection]
  );

  const flattenedEvaluationData: SecurityEvaluation[] | undefined = useMemo(
    () =>
      data
        ?.map(({ isin, securityName, exchanges }) =>
          exchanges.map(({ name, quoteData }) => ({
            isin,
            securityName,
            exchangeName: name,
            evaluation: getEvaluatedQuoteData(quoteData),
          }))
        )
        .flat(),
    [data]
  );

  const sortedData = useMemo(() => {
    if (flattenedEvaluationData == null) {
      return undefined;
    }

    const temp = [...flattenedEvaluationData];
    temp.sort(compareFn);
    return temp;
  }, [flattenedEvaluationData, compareFn]);

  const sortDirectionIcon = useMemo(
    () =>
      ({
        asc: <BarsArrowUpIcon className="w-6" />,
        desc: <BarsArrowDownIcon className="w-6" />,
      }[sortDirection]),
    [sortDirection]
  );

  return (
    <div className="p-3">
      <div className="flex flex-row items-center justify-between mb-3">
        {/* TODO: change `mr-auto` to `me-auto` in later tailwind versions */}
        <h1 className="text-4xl w-full font-extrabold whitespace-nowrap text-ellipsis overflow-x-clip">
          Security Evaluation
        </h1>

        <div className="flex flex-row gap-1">
          <select
            id="evaluation-page-sort-column-select"
            value={sortColum}
            onChange={(e) => {
              setSortColumn(e.target.value as SortColumn);
            }}
            className="w-fit border border-neutral-400 px-2 py-1 rounded-md cursor-pointer shadow-md"
          >
            {evaluationSortColumns.map((column) => (
              <option key={column} value={column}>
                {
                  {
                    rslValue: "RSL",
                    securityName: "Security Name",
                    smaComp: "SMA Comparison",
                  }[column]
                }
              </option>
            ))}
          </select>

          <button
            className="h-8 p-1 border border-neutral-400 hover:bg-neutral-200 rounded-md shadow-md"
            title="Changes sort direction"
            onClick={toggleSortDirection}
          >
            {sortDirectionIcon}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {sortedData?.map((item) => (
          <SecurityEvaluationBox
            key={`${item.isin}-${item.exchangeName}`}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
