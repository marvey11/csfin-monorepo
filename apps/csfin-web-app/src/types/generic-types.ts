import { AxiosRequestConfig } from "axios";

interface UseGenericContextType<T> {
  data: T | undefined;
  requestData: (config: AxiosRequestConfig) => Promise<void>;
}

export type { UseGenericContextType };
