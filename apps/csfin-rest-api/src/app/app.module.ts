import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SecuritiesExchange } from "./exchanges/entities/exchange.entity";
import { ExchangesModule } from "./exchanges/exchanges.module";
import { QuoteData } from "./quotes/entities/quote.entity";
import { QuotesModule } from "./quotes/quotes.module";
import { Security } from "./securities/entities/security.entity";
import { SecuritiesModule } from "./securities/securities.module";

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
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
