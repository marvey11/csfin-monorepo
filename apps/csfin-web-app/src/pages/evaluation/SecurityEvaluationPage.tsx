import { SingleSecurityQuoteResponse } from "@csfin-monorepo/core";
import { useEffect, useMemo } from "react";
import { SecurityEvaluationBox } from "../../components";
import useAxios from "../../hooks/useAxios";
import { getEvaluatedQuoteData } from "../../utils";

export const SecurityEvaluationPage = () => {
  const { data, sendRequest } = useAxios<SingleSecurityQuoteResponse[]>();

  const sortedConvertedData = useMemo(() => {
    if (data) {
      const converted = data
        .map(({ isin, securityName, exchanges }) =>
          exchanges.map(({ name, quoteData }) => ({
            isin,
            securityName,
            exchangeName: name,
            evaluation: getEvaluatedQuoteData(quoteData),
          }))
        )
        .flat();

      converted.sort((a, b) => b.evaluation.smaComp - a.evaluation.smaComp);

      return converted;
    }
    return undefined;
  }, [data]);

  useEffect(() => {
    sendRequest({ url: "/quotes?limit=201", method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center justify-start mb-3">
        {/* TODO: change `mr-auto` to `me-auto` in later tailwind versions */}
        <h1 className="text-4xl w-full font-extrabold whitespace-nowrap text-ellipsis overflow-x-clip">
          Security Evaluation
        </h1>
      </div>

      <div className="flex flex-col gap-1">
        {sortedConvertedData &&
          sortedConvertedData.map((item) => (
            <SecurityEvaluationBox key={item.isin} {...item} />
          ))}
      </div>
    </div>
  );
};
