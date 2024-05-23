import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecuritiesExchange } from "../exchanges";
import { Security } from "../securities";
import { QuoteData } from "./entities";
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
