import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExchangesModule } from "./exchanges";
import { SecuritiesExchange } from "./exchanges/entities/exchange.entity";
import { QuotesModule } from "./quotes";
import { QuoteData } from "./quotes/entities/quote.entity";
import { SecuritiesModule } from "./securities";
import { Security } from "./securities/entities/security.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "codescape",
      password: "password",
      database: "codescape-financial",
      entities: [QuoteData, SecuritiesExchange, Security],
      synchronize: true,
    }),
    ExchangesModule,
    QuotesModule,
    SecuritiesModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
