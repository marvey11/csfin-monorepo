import { ExchangeData, ExchangeResponseData } from "@csfin-monorepo/core";
import { DataPageContainer, ExchangeForm } from "../../components";
import { useOutletContextData } from "../../hooks";

export const EditExchangePage = () => {
  const {
    loading,
    error,
    data: exchange,
    sendRequest,
  } = useOutletContextData<ExchangeResponseData>();

  const updateExchange = (data: ExchangeData) => {
    exchange &&
      sendRequest({ url: `/exchanges/${exchange.id}`, method: "patch", data });
  };

  return (
    <DataPageContainer isLoading={loading} error={error}>
      <h1 className="text-4xl font-extrabold">Create Exchange</h1>;
      {exchange && <ExchangeForm value={exchange} onSubmit={updateExchange} />}
    </DataPageContainer>
  );
};
