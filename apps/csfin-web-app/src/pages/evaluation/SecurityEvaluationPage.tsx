import {
  SingleSecurityQuoteResponse,
  SortDirection,
} from "@csfin-monorepo/core";
import { Checkbox, Select } from "@csfin-monorepo/core-ui";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/16/solid";
import axios, { AxiosResponseTransformer } from "axios";
import { useCallback, useEffect, useMemo } from "react";
import { DataPageContainer, SecurityEvaluationBox } from "../../components";
import { useAxios, useLocalStorage } from "../../hooks";
import { EvaluationData, SecurityEvaluation } from "../../types";
import { getEvaluatedQuoteData, transformEvaluationData } from "../../utils";

const evaluationSortColumns = [
  "securityName",
  "smaComp",
  "rslValue",
  "weighted",
] as const;
type SortColumn = (typeof evaluationSortColumns)[number];

export const SecurityEvaluationPage = () => {
  const { loading, error, data, sendRequest } =
    useAxios<SingleSecurityQuoteResponse[]>();

  const [sortColumn, setSortColumn] = useLocalStorage<SortColumn>(
    "csfin.evaluation.sort-column",
    "securityName"
  );
  const [sortDirection, setSortDirection] = useLocalStorage<SortDirection>(
    "csfin.evaluation.sort-direction",
    "desc"
  );
  const [grouped, setGrouped] = useLocalStorage(
    "csfin.evaluation.group-by-type",
    false
  );

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

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
      const primitiveCompare = <T extends string | number>(a: T, b: T) => {
        if (typeof a === "string" && typeof b === "string") {
          return a.localeCompare(b);
        }
        return a > b ? 1 : -1;
      };

      const compare = <T extends string | number>(a: T, b: T) => {
        if (a === b) return 0;
        return primitiveCompare(a, b) * (sortDirection === "asc" ? 1 : -1);
      };

      const fullCompare = <T extends string | number>(a: T, b: T) => {
        if (grouped) {
          if (one.securityType === two.securityType) {
            return compare(a, b);
          }
          return one.securityType > two.securityType ? 1 : -1;
        }
        return compare(a, b);
      };

      const weightedEval = (evalData: EvaluationData) =>
        (2 * evalData.rslValue + 3 * evalData.smaComp) / (2 + 3);

      return {
        rslValue: fullCompare(one.evaluation.rslValue, two.evaluation.rslValue),
        smaComp: fullCompare(one.evaluation.smaComp, two.evaluation.smaComp),
        securityName: fullCompare(one.securityName, two.securityName),
        weighted: fullCompare(
          weightedEval(one.evaluation),
          weightedEval(two.evaluation)
        ),
      }[sortColumn];
    },
    [grouped, sortColumn, sortDirection]
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
    <DataPageContainer isLoading={loading} error={error}>
      <div className="flex flex-row items-center justify-between mb-3">
        {/* TODO: change `mr-auto` to `me-auto` in later tailwind versions */}
        <h1 className="text-4xl w-full font-extrabold whitespace-nowrap text-ellipsis overflow-x-clip">
          Security Evaluation
        </h1>

        <Checkbox
          id="group-by-type-checkbox"
          label="Group securities by type"
          size={5}
          checked={grouped}
          onChange={setGrouped}
          className="mr-2"
        />

        <div className="flex flex-row gap-1 items-center p-0 m-0">
          <Select
            id="evaluation-page-sort-column-select"
            options={evaluationSortColumns.map((column) => ({
              value: column,
              label: {
                rslValue: "RSL",
                securityName: "Security Name",
                smaComp: "SMA Comparison",
                weighted: "Weighted Comparison",
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
