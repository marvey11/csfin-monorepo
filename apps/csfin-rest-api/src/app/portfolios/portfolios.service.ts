import { CreatePortfolioDto, UpdatePortfolioDto } from "@csfin-monorepo/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Portfolio } from "./entities/portfolio.entity";

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
  ) {}

  async create(createDTO: CreatePortfolioDto) {
    return this.portfolioRepository.save(createDTO);
  }

  async findAll() {
    return this.portfolioRepository.find();
  }

  async findOne(id: string) {
    return this.portfolioRepository.findOneBy({ id: id });
  }

  async update(id: string, updateDTO: UpdatePortfolioDto) {
    return this.portfolioRepository
      .findOneByOrFail({ id })
      .then((portfolio) => {
        return this.portfolioRepository.save({ ...portfolio, ...updateDTO });
      });
  }

  async remove(id: string) {
    return this.portfolioRepository.delete({ id: id });
  }
}
