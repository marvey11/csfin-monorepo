import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SecurityTransaction } from "./entities/transaction.entity";
import { TransactionsController } from "./transactions.controller";
import { TransactionsService } from "./transactions.service";

@Module({
  imports: [TypeOrmModule.forFeature([SecurityTransaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TransactionsModule {}
