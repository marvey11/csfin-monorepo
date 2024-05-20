import { AxiosRequestConfig } from "axios";

interface UseGenericContextType<T> {
  data: T | undefined;
  sendRequest: (config: AxiosRequestConfig) => Promise<void>;
}

export type { UseGenericContextType };
