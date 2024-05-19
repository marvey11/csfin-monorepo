import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { SecurityResponseData } from "../types";

export const SecurityListPage = () => {
  const navigate = useNavigate();

  const { loading, error, data, requestData } =
    useAxios<SecurityResponseData[]>();

  useEffect(() => {
    requestData({ url: "/securities", method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3">
      <div className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-4xl font-extrabold">Securities</h1>
        <Link to="/securities/create">
          <button className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
            Create Security
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {data &&
          data.map(({ id, isin, nsin, name }) => (
            <div
              key={isin}
              className="border border-blue-500 p-2 cursor-pointer rounded-md bg-blue-100"
              onClick={() => {
                navigate(`/securities/${id}`);
              }}
            >
              <div className="flex flex-row justify-between items-center">
                <span
                  className="text-lg whitespace-nowrap text-ellipsis overflow-x-clip mr-2"
                  title={name}
                >
                  {name}
                </span>
                <div className="flex flex-col">
                  <span className="text-end text-neutral-500">
                    ISIN:&nbsp;
                    <span className="font-bold text-black">{isin}</span>
                  </span>
                  <span className="text-end text-neutral-500">
                    NSIN:&nbsp;
                    <span className="font-bold text-black">{nsin}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
