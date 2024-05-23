import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecuritiesExchange } from "./entities";
import { ExchangesController } from "./exchanges.controller";
import { ExchangesService } from "./exchanges.service";

@Module({
  imports: [TypeOrmModule.forFeature([SecuritiesExchange])],
  controllers: [ExchangesController],
  providers: [ExchangesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ExchangesModule {}
