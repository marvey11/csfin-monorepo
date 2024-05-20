import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExchangeDto } from "./dto/create-exchange.dto";
import { UpdateExchangeDto } from "./dto/update-exchange.dto";
import { SecuritiesExchange } from "./entities/exchange.entity";

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
