import { ExchangeForm } from "../components";
import useOutletContextData from "../hooks/useOutletContextData";
import { ExchangeData, ExchangeResponseData } from "../types";

export const EditExchangePage = () => {
  const { data: exchange, requestData } =
    useOutletContextData<ExchangeResponseData>();

  const updateExchange = (data: ExchangeData) => {
    exchange &&
      requestData({ url: `/exchanges/${exchange.id}`, method: "patch", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Exchange</h1>;
      {exchange && <ExchangeForm value={exchange} onSubmit={updateExchange} />}
    </div>
  );
};
