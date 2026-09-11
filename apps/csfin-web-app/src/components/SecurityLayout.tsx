import { SecurityResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAxios } from "../hooks";
import { UseGenericContextType } from "../types";

export const SecurityLayout = () => {
  const { id } = useParams();

  const { loading, error, data, sendRequest } =
    useAxios<SecurityResponseData>();

  useEffect(() => {
    if (id) {
      sendRequest({ url: `/securities/${id}`, method: "get" });
    }
  }, [id, sendRequest]);

  return (
    <Outlet
      context={
        {
          loading,
          error,
          data,
          sendRequest,
        } satisfies UseGenericContextType<SecurityResponseData>
      }
    />
  );
};
