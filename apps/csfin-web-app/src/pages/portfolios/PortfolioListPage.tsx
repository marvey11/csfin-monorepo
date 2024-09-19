import { PortfolioResponseData } from "@csfin-monorepo/core";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataPageContainer } from "../../components";
import { useAxios } from "../../hooks";

export const PortfolioListPage = () => {
  const navigate = useNavigate();

  const { loading, error, data, sendRequest } =
    useAxios<PortfolioResponseData[]>();

  useEffect(() => {
    sendRequest({ url: "/portfolios", method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testData: PortfolioResponseData[] = [
    {
      id: "abc",
      name: "Depot comdirect",
      description:
        "Some really long description that hopefully will show that the overflow is indeed hidden and clipped. If not, we'll have to add even more text.",
    },
    {
      id: "def",
      name: "Some other portfolio",
    },
  ];

  return (
    <DataPageContainer isLoading={loading} error={error}>
      <span className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-4xl font-extrabold">Portfolios</h1>
        <Link to="/portfolios/create">
          <button className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
            Create Portfolio
          </button>
        </Link>
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {data &&
          data.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => {
                navigate(`/portfolios/${id}`);
              }}
              className="flex flex-row justify-start items-start border p-2 cursor-pointer rounded-md hover:shadow-lg border-blue-500 bg-blue-100 hover:bg-blue-200"
            >
              <span className="flex flex-col overflow-x-clip">
                <span
                  title={name}
                  className="text-lg font-semibold whitespace-nowrap overflow-x-clip text-ellipsis"
                >
                  {name}
                </span>
              </span>
            </div>
          ))}
      </div>
    </DataPageContainer>
  );
};
