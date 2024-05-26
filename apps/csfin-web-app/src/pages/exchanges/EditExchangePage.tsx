import { ExchangeData, ExchangeResponseData } from "@csfin-monorepo/core";
import { DataPageContainer, ExchangeForm } from "../../components";
import useOutletContextData from "../../hooks/useOutletContextData";

export const EditExchangePage = () => {
  const {
    loading,
    data: exchange,
    sendRequest,
  } = useOutletContextData<ExchangeResponseData>();

  const updateExchange = (data: ExchangeData) => {
    exchange &&
      sendRequest({ url: `/exchanges/${exchange.id}`, method: "patch", data });
  };

  return (
    <DataPageContainer isLoading={loading}>
      <h1 className="text-4xl font-extrabold">Create Exchange</h1>;
      {exchange && <ExchangeForm value={exchange} onSubmit={updateExchange} />}
    </DataPageContainer>
  );
};
