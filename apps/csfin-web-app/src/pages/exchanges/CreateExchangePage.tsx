import { ExchangeData } from "@csfin-monorepo/core";
import { ExchangeForm } from "../../components";
import { useAxios } from "../../hooks";

export const CreateExchangePage = () => {
  const { sendRequest } = useAxios();

  const addExchange = (data: ExchangeData) => {
    sendRequest({ url: "/exchanges", method: "post", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Exchange</h1>
      <ExchangeForm onSubmit={addExchange} />
    </div>
  );
};
