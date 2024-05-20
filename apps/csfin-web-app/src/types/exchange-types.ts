type ExchangeResponseData = {
  id: string;
} & ExchangeData;

interface ExchangeData {
  name: string;
}

export type { ExchangeData, ExchangeResponseData };
