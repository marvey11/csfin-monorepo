import { PortfolioData } from "@csfin-monorepo/core";
import { PortfolioForm } from "../../components/PortfolioForm";
import { useAxios } from "../../hooks";

export const CreatePortfolioPage = () => {
  const { sendRequest } = useAxios();

  const addPortfolio = (data: PortfolioData) => {
    sendRequest({ url: "/portfolios", method: "post", data });
  };

  return (
    <div className="p-3">
      <h1 className="text-4xl font-extrabold">Create Portfolio</h1>
      <PortfolioForm onSubmit={addPortfolio} />
    </div>
  );
};
