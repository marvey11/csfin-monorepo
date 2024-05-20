import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import useAxios from "../hooks/useAxios";
import { SecurityResponseData, SecurityType } from "../types";

export const SecurityListPage = () => {
  const navigate = useNavigate();

  const { data, sendRequest } = useAxios<SecurityResponseData[]>();

  useEffect(() => {
    sendRequest({ url: "/securities", method: "get" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-3">
      <span className="flex flex-row items-center justify-between mb-3">
        <h1 className="text-4xl font-extrabold">Securities</h1>
        <Link to="/securities/create">
          <button className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
            Create Security
          </button>
        </Link>
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        {data &&
          data.map(({ id, isin, nsin, name, type: securityType }) => (
            <div
              key={id}
              onClick={() => {
                navigate(`/securities/${id}`);
              }}
              className={twMerge(
                "flex flex-row justify-between items-center border p-2 cursor-pointer rounded-md hover:shadow-lg",
                mapSecurityTypeToColors[securityType]
              )}
            >
              <span className="flex flex-col mr-2 overflow-x-clip">
                <span
                  title={name}
                  className="text-lg whitespace-nowrap overflow-x-clip text-ellipsis"
                >
                  {name}
                </span>
                <span className="text-xs uppercase">{securityType}</span>
              </span>

              <span className="flex flex-col min-w-min">
                <span className="text-end text-neutral-500">
                  ISIN:&nbsp;
                  <span className="font-bold text-black">{isin}</span>
                </span>
                <span className="text-end text-neutral-500">
                  NSIN:&nbsp;
                  <span className="font-bold text-black">{nsin}</span>
                </span>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapSecurityTypeToColors: { [K in SecurityType]: string } = {
  etf: "border-green-500 bg-green-100 hover:bg-green-200",
  stock: "border-blue-500 bg-blue-100 hover:bg-blue-200",
};
