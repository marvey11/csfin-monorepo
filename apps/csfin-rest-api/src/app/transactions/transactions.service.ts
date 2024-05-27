import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "@csfin-monorepo/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SecurityTransaction } from "./entities/transaction.entity";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(SecurityTransaction)
    private transactionsRepository: Repository<SecurityTransaction>
  ) {}

  async create(createDTO: CreateTransactionDto) {
    return this.transactionsRepository.save(createDTO);
  }

  async findAll() {
    return this.transactionsRepository.find();
  }

  async findOne(id: string) {
    return this.transactionsRepository.findOneBy({ id });
  }

  async update(id: string, updateDTO: UpdateTransactionDto) {
    return this.transactionsRepository
      .findOneByOrFail({ id })
      .then((transaction) => {
        return this.transactionsRepository.save({
          ...transaction,
          ...updateDTO,
        });
      });
  }

  async remove(id: string) {
    return this.transactionsRepository.delete({ id });
  }
}
