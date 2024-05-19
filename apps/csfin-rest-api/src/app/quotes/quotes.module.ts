import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Security } from "../securities/entities/security.entity";
import { Quote } from "./entities/quote.entity";
import { QuotesController } from "./quotes.controller";
import { QuotesService } from "./quotes.service";

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Security])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class QuotesModule {}
