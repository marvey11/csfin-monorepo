import { PortfolioData } from "../../types";

type CreatePortfolioDto = PortfolioData;

type UpdatePortfolioDto = Partial<CreatePortfolioDto>;

export type { CreatePortfolioDto, UpdatePortfolioDto };
