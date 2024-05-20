class CreateQuoteDataDto {
  isin: string;
  exchangeName: string;
  date: Date;
  price: number;
}

interface QuoteDataItem {
  date: Date;
  price: number;
}

class CreateManyQuotesDto {
  isin: string;
  exchangeName: string;
  quoteItems: QuoteDataItem[];
}

export { CreateManyQuotesDto, CreateQuoteDataDto, QuoteDataItem };
