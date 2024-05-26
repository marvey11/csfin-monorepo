import { ExchangeResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { UseGenericContextType } from "../types";

export const ExchangeLayout = () => {
  const { id } = useParams();

  const { loading, error, data, sendRequest } =
    useAxios<ExchangeResponseData>();

  useEffect(() => {
    id && sendRequest({ url: `/exchanges/${id}`, method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Outlet
      context={
        {
          loading,
          error,
          data,
          sendRequest,
        } satisfies UseGenericContextType<ExchangeResponseData>
      }
    />
  );
};
