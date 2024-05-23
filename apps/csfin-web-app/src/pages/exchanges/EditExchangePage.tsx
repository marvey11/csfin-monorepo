import { ExchangeData, ExchangeResponseData } from "@csfin-monorepo/core";
import { ExchangeForm } from "../../components";
import useOutletContextData from "../../hooks/useOutletContextData";

export const EditExchangePage = () => {
  const { data: exchange, sendRequest } =
    useOutletContextData<ExchangeResponseData>();

  const updateExchange = (data: ExchangeData) => {
    exchange &&
      sendRequest({ url: `/exchanges/${exchange.id}`, method: "patch", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Exchange</h1>;
      {exchange && <ExchangeForm value={exchange} onSubmit={updateExchange} />}
    </div>
  );
};
