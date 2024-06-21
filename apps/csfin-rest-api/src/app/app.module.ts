import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExchangesModule } from "./exchanges";
import { SecuritiesExchange } from "./exchanges/entities/exchange.entity";
import { PortfoliosModule } from "./portfolios";
import { Portfolio } from "./portfolios/entities/portfolio.entity";
import { QuotesModule } from "./quotes";
import { QuoteData } from "./quotes/entities/quote.entity";
import { SecuritiesModule } from "./securities";
import { Security } from "./securities/entities/security.entity";
import { TransactionsModule } from "./transactions";
import { SecurityTransaction } from "./transactions/entities/transaction.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "codescape",
      password: "password",
      database: "codescape-financial",
      entities: [
        QuoteData,
        Portfolio,
        SecuritiesExchange,
        Security,
        SecurityTransaction,
      ],
      synchronize: true,
    }),
    ExchangesModule,
    PortfoliosModule,
    QuotesModule,
    SecuritiesModule,
    TransactionsModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
