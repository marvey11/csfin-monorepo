import { ExchangeResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataPageContainer } from "../../components";
import useAxios from "../../hooks/useAxios";

export const ExchangeListPage = () => {
  const navigate = useNavigate();

  const { loading, error, data, sendRequest } =
    useAxios<ExchangeResponseData[]>();

  useEffect(() => {
    sendRequest({ url: "/exchanges", method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataPageContainer isLoading={loading} error={error}>
      <span className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-4xl font-extrabold">Exchanges</h1>
        <Link to="/exchanges/create">
          <button className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
            Create Exchange
          </button>
        </Link>
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {data &&
          data.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => {
                navigate(`/exchanges/${id}`);
              }}
              className="flex flex-row justify-start items-center border p-2 cursor-pointer rounded-md hover:shadow-lg border-blue-500 bg-blue-100 hover:bg-blue-200"
            >
              <span
                title={name}
                className="text-lg whitespace-nowrap overflow-x-clip text-ellipsis"
              >
                {name}
              </span>
            </div>
          ))}
      </div>
    </DataPageContainer>
  );
};
