import { SecurityForm } from "../components";
import useSecurity from "../hooks/useSecurity";
import { SecurityData } from "../types";

export const EditSecurityPage = () => {
  const { security, requestData } = useSecurity();

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
