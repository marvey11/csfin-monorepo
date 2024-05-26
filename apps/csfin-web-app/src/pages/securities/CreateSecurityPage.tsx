import { SecurityData } from "@csfin-monorepo/core";
import { SecurityForm } from "../../components";
import { useAxios } from "../../hooks";

export const CreateSecurityPage = () => {
  const { sendRequest } = useAxios();

  const addSecurity = (data: SecurityData) => {
    sendRequest({ url: "/securities", method: "post", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Security</h1>
      <SecurityForm onSubmit={addSecurity} />
    </div>
  );
};
