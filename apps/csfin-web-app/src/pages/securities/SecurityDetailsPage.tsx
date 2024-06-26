import { SecurityResponseData } from "@csfin-monorepo/core";
import { AxiosRequestConfig } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DataPageContainer } from "../../components";
import { useOutletContextData } from "../../hooks";

export const SecurityDetailsPage = () => {
  const navigate = useNavigate();

  const {
    loading,
    error,
    data: security,
    sendRequest,
  } = useOutletContextData<SecurityResponseData>();

  const handleDelete = () => {
    if (security) {
      sendRequest({
        url: `/securities/${security.id}`,
        method: "delete",
      } satisfies AxiosRequestConfig);
      navigate("..", { replace: true });
    }
  };

  return (
    <DataPageContainer isLoading={loading} error={error}>
      {security && (
        <div className="flex flex-row items-center justify-between mb-3 gap-1">
          {/* TODO: change `mr-auto` to `me-auto` in later tailwind versions */}
          <h1
            className="text-4xl w-full font-extrabold whitespace-nowrap text-ellipsis overflow-x-clip mr-auto"
            title={security.name}
          >
            {security.name}
          </h1>

          <Link to={`/securities/${security.id}/edit`}>
            <button className="min-h-10 min-w-24 rounded-md border bg-blue-500 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700">
              Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="min-h-10 min-w-24 rounded-md border bg-red-500 px-4 py-2 font-bold text-white shadow-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </DataPageContainer>
  );
};
