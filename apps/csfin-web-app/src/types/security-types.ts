import { AxiosRequestConfig } from "axios";

const securityTypes = ["stock", "etf"] as const;
type SecurityType = (typeof securityTypes)[number];

type SecurityResponseData = {
  id: string;
} & SecurityData;

interface SecurityData {
  isin: string;
  nsin: string;
  name: string;
  shortName?: string;
  type: SecurityType;
}

interface UseSecurityContextType {
  security: SecurityResponseData | undefined;
  requestData: (config: AxiosRequestConfig) => Promise<void>;
}

export { securityTypes };
export type {
  SecurityData,
  SecurityResponseData,
  SecurityType,
  UseSecurityContextType,
};
