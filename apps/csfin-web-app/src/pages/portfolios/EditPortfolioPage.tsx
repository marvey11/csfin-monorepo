import { PortfolioData, PortfolioResponseData } from "@csfin-monorepo/core";
import { DataPageContainer } from "../../components";
import { PortfolioForm } from "../../components/PortfolioForm";
import { useOutletContextData } from "../../hooks";

export const EditPortfolioPage = () => {
  const {
    loading,
    error,
    data: portfolio,
    sendRequest,
  } = useOutletContextData<PortfolioResponseData>();

  const updatePortfolio = (data: PortfolioData) => {
    portfolio &&
      sendRequest({
        url: `/portfolios/${portfolio.id}`,
        method: "patch",
        data,
      });
  };

  return (
    <DataPageContainer isLoading={loading} error={error}>
      <h1 className="text-4xl font-extrabold">Create Portfolio</h1>;
      {portfolio && (
        <PortfolioForm value={portfolio} onSubmit={updatePortfolio} />
      )}
    </DataPageContainer>
  );
};
