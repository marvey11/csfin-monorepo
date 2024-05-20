class CreateQuoteDto {
  isin: string;
  date: Date;
  price: number;
}

interface QuoteItem {
  date: Date;
  price: number;
}

class CreateManyQuotesDto {
  isin: string;
  quoteItems: QuoteItem[];
}

export { CreateManyQuotesDto, CreateQuoteDto };
