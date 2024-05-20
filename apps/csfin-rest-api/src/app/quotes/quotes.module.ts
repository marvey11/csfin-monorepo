import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecuritiesExchange } from "../exchanges/entities/exchange.entity";
import { Security } from "../securities/entities/security.entity";
import { QuoteData } from "./entities/quote.entity";
import { QuotesController } from "./quotes.controller";
import { QuotesService } from "./quotes.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuoteData, SecuritiesExchange, Security]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class QuotesModule {}
