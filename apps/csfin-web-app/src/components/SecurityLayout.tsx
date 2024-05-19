import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { SecurityResponseData, UseSecurityContextType } from "../types";

export const SecurityLayout = () => {
  const { id } = useParams();

  const { loading, error, data, requestData } =
    useAxios<SecurityResponseData>();

  useEffect(() => {
    id && requestData({ url: `/securities/${id}`, method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    // TODO: process loading and error states
    <Outlet
      context={{ security: data, requestData } satisfies UseSecurityContextType}
    />
  );
};
