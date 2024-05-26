import { SecurityData, SecurityResponseData } from "@csfin-monorepo/core";
import { DataPageContainer, SecurityForm } from "../../components";
import useOutletContextData from "../../hooks/useOutletContextData";

export const EditSecurityPage = () => {
  const {
    loading,
    error,
    data: security,
    sendRequest,
  } = useOutletContextData<SecurityResponseData>();

  const updateSecurity = (data: SecurityData) => {
    security &&
      sendRequest({ url: `/securities/${security.id}`, method: "patch", data });
  };

  return (
    <DataPageContainer isLoading={loading} error={error}>
      <h1 className="text-4xl font-extrabold">Create Security</h1>;
      {security && <SecurityForm value={security} onSubmit={updateSecurity} />}
    </DataPageContainer>
  );
};
