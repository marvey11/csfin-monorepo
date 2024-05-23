import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Security } from "./entities";
import { SecuritiesController } from "./securities.controller";
import { SecuritiesService } from "./securities.service";

@Module({
  imports: [TypeOrmModule.forFeature([Security])],
  controllers: [SecuritiesController],
  providers: [SecuritiesService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SecuritiesModule {}
