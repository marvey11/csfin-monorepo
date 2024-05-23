import { QuoteDataItem } from "../../types";

interface CreateQuoteDataDto {
  isin: string;
  exchangeName: string;
  date: Date;
  price: number;
}

interface CreateManyQuotesDto {
  isin: string;
  exchangeName: string;
  quoteItems: QuoteDataItem[];
}

type UpdateQuoteDto = Partial<CreateQuoteDataDto>;

export { CreateManyQuotesDto, CreateQuoteDataDto, UpdateQuoteDto };
