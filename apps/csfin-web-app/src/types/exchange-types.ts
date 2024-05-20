import { AxiosRequestConfig } from "axios";

type ExchangeResponseData = {
  id: string;
} & ExchangeData;

interface ExchangeData {
  name: string;
}

interface UseExchangeContextType {
  exchange: ExchangeResponseData | undefined;
  requestData: (config: AxiosRequestConfig) => Promise<void>;
}

export type { ExchangeData, ExchangeResponseData, UseExchangeContextType };
