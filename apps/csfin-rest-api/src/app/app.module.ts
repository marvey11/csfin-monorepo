import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExchangesModule, SecuritiesExchange } from "./exchanges";
import { QuoteData, QuotesModule } from "./quotes";
import { SecuritiesModule, Security } from "./securities";

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
