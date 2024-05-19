import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSecurityDto } from "./dto/create-security.dto";
import { UpdateSecurityDto } from "./dto/update-security.dto";
import { Security } from "./entities/security.entity";

@Injectable()
export class SecuritiesService {
  constructor(
    @InjectRepository(Security)
    private securitiesRepository: Repository<Security>
  ) {}

  async create(createDTO: CreateSecurityDto) {
    return this.securitiesRepository.save(createDTO);
  }

  async findAll() {
    return this.securitiesRepository
      .createQueryBuilder("security")
      .orderBy("security.isin", "ASC")
      .getMany();
  }

  async findOne(id: string) {
    return this.securitiesRepository.findOneBy({ id: id });
  }

  async update(id: string, updateDTO: UpdateSecurityDto) {
    return this.securitiesRepository
      .findOneByOrFail({ id })
      .then((security) => {
        this.securitiesRepository.save({ ...security, ...updateDTO });
      });
  }

  async remove(id: string) {
    return this.securitiesRepository.delete({ id: id });
  }
}
