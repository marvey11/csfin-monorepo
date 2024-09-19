import { PortfolioResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAxios } from "../hooks";
import { UseGenericContextType } from "../types";

export const PortfolioLayout = () => {
  const { id } = useParams();

  const { loading, error, data, sendRequest } =
    useAxios<PortfolioResponseData>();

  useEffect(() => {
    id && sendRequest({ url: `/portfolios/${id}`, method: "get" });
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
        } satisfies UseGenericContextType<PortfolioResponseData>
      }
    />
  );
};
