import { SecurityForm } from "../components";
import useAxios from "../hooks/useAxios";
import { SecurityData } from "../types";

export const CreateSecurityPage = () => {
  const { requestData } = useAxios();

  const addSecurity = (data: SecurityData) => {
    requestData({ url: "/securities", method: "post", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Security</h1>
      <SecurityForm onSubmit={addSecurity} />
    </div>
  );
};
