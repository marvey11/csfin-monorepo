import { SecurityResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { UseGenericContextType } from "../types";

export const SecurityLayout = () => {
  const { id } = useParams();

  const { data, sendRequest } = useAxios<SecurityResponseData>();

  useEffect(() => {
    id && sendRequest({ url: `/securities/${id}`, method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    // TODO: process loading and error states
    <Outlet
      context={
        {
          data,
          sendRequest,
        } satisfies UseGenericContextType<SecurityResponseData>
      }
    />
  );
};
