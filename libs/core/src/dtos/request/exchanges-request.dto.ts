import { ExchangeData } from "../../types";

type CreateExchangeDto = ExchangeData;

type UpdateExchangeDto = Partial<CreateExchangeDto>;

export type { CreateExchangeDto, UpdateExchangeDto };
