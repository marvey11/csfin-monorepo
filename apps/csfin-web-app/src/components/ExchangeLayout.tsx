import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { ExchangeResponseData, UseExchangeContextType } from "../types";

export const ExchangeLayout = () => {
  const { id } = useParams();

  const { loading, error, data, requestData } =
    useAxios<ExchangeResponseData>();

  useEffect(() => {
    id && requestData({ url: `/exchanges/${id}`, method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    // TODO: process loading and error states
    <Outlet
      context={{ exchange: data, requestData } satisfies UseExchangeContextType}
    />
  );
};
