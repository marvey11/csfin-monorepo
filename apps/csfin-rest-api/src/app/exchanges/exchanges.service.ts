import { CreateExchangeDto, UpdateExchangeDto } from "@csfin-monorepo/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SecuritiesExchange } from "./entities";

@Injectable()
export class ExchangesService {
  constructor(
    @InjectRepository(SecuritiesExchange)
    private exchangesRepository: Repository<SecuritiesExchange>
  ) {}

  async create(
    createDTO: CreateExchangeDto | CreateExchangeDto[]
  ): Promise<SecuritiesExchange | SecuritiesExchange[]> {
    if (Array.isArray(createDTO)) {
      return this.exchangesRepository.save(createDTO);
    }

    return this.exchangesRepository.save({ ...createDTO });
  }

  async findAll() {
    return this.exchangesRepository.find();
  }

  async findOne(id: string) {
    return this.exchangesRepository.findOneBy({ id: id });
  }

  async update(id: string, updateDTO: UpdateExchangeDto) {
    return this.exchangesRepository
      .findOneByOrFail({ id: id })
      .then((exchange) => {
        return this.exchangesRepository.save({ ...exchange, ...updateDTO });
      });
  }

  async remove(id: string) {
    return this.exchangesRepository.delete({ id: id });
  }
}
