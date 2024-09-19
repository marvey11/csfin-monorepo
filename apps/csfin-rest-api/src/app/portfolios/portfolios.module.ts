import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Portfolio } from "./entities/portfolio.entity";
import { PortfoliosController } from "./portfolios.controller";
import { PortfoliosService } from "./portfolios.service";

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PortfoliosModule {}
