import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { ExchangeResponseData, UseGenericContextType } from "../types";

export const ExchangeLayout = () => {
  const { id } = useParams();

  const { data, requestData } = useAxios<ExchangeResponseData>();

  useEffect(() => {
    id && requestData({ url: `/exchanges/${id}`, method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    // TODO: process loading and error states
    <Outlet
      context={
        {
          data,
          requestData,
        } satisfies UseGenericContextType<ExchangeResponseData>
      }
    />
  );
};
