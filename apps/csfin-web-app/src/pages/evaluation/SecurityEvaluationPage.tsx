import { SingleSecurityQuoteResponse } from "@csfin-monorepo/core";
import { Checkbox, Select } from "@csfin-monorepo/core-ui";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/16/solid";
import axios, { AxiosResponseTransformer } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataPageContainer, SecurityEvaluationBox } from "../../components";
import useAxios from "../../hooks/useAxios";
import useSortDirection from "../../hooks/useSortDirection";
import { SecurityEvaluation } from "../../types";
import { getEvaluatedQuoteData, transformEvaluationData } from "../../utils";

const evaluationSortColumns = ["securityName", "smaComp", "rslValue"] as const;
type SortColumn = (typeof evaluationSortColumns)[number];

export const SecurityEvaluationPage = () => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("rslValue");
  const [grouped, setGrouped] = useState(false);

  const { sortDirection, toggleSortDirection } = useSortDirection("desc");
  const { loading, data, sendRequest } =
    useAxios<SingleSecurityQuoteResponse[]>();

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
      }[sortColumn];
    },
    [sortColumn, sortDirection]
  );

  const flattenedEvaluationData: SecurityEvaluation[] | undefined = useMemo(
    () =>
      data
        ?.map(({ isin, securityName, securityType, exchanges }) =>
          exchanges.map(({ name, quoteData }) => ({
            isin,
            securityName,
            securityType,
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

  const handleSelectionChanged = (value: string) => {
    setSortColumn(value as SortColumn);
  };

  const sortDirectionIcon = {
    asc: <BarsArrowUpIcon className="w-6" />,
    desc: <BarsArrowDownIcon className="w-6" />,
  }[sortDirection];

  return (
    <DataPageContainer isLoading={loading}>
      <div className="flex flex-row items-center justify-between mb-3">
        {/* TODO: change `mr-auto` to `me-auto` in later tailwind versions */}
        <h1 className="text-4xl w-full font-extrabold whitespace-nowrap text-ellipsis overflow-x-clip">
          Security Evaluation
        </h1>

        <div className="flex flex-row gap-1 items-center p-0 m-0">
          <Checkbox
            id="group-by-type-checkbox"
            label="Group securities by type"
            size={5}
            checked={grouped}
            onChange={setGrouped}
            className="mr-2"
          />

          <Select
            id="evaluation-page-sort-column-select"
            options={evaluationSortColumns.map((column) => ({
              value: column,
              label: {
                rslValue: "RSL",
                securityName: "Security Name",
                smaComp: "SMA Comparison",
              }[column],
            }))}
            value={sortColumn}
            onChange={handleSelectionChanged}
            title="Select sort parameter"
          />

          <button
            className="border border-neutral-400 hover:bg-neutral-200 rounded-md shadow-md p-1"
            title="Toggle sort direction"
            onClick={toggleSortDirection}
          >
            {sortDirectionIcon}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {sortedData?.map((item, index) => (
          <SecurityEvaluationBox
            key={`${item.isin}-${item.exchangeName}`}
            index={index}
            {...item}
          />
        ))}
      </div>
    </DataPageContainer>
  );
};
