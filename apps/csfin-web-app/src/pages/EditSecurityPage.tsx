import { SecurityForm } from "../components";
import useOutletContextData from "../hooks/useOutletContextData";
import { SecurityData, SecurityResponseData } from "../types";

export const EditSecurityPage = () => {
  const { data: security, requestData } =
    useOutletContextData<SecurityResponseData>();

  const updateSecurity = (data: SecurityData) => {
    security &&
      requestData({ url: `/securities/${security.id}`, method: "patch", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Security</h1>;
      {security && <SecurityForm value={security} onSubmit={updateSecurity} />}
    </div>
  );
};
