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
    private securitiesRepository: Repository<Security>,
  ) {}

  async create(createDTO: CreateSecurityDto) {
    return this.securitiesRepository.save(createDTO);
  }

  async findAll() {
    return this.securitiesRepository.find();
  }

  async findOne(id: string) {
    return this.securitiesRepository.findOneBy({ id: id });
  }

  async update(id: string, updateDTO: UpdateSecurityDto) {
    console.log(updateDTO);
    return `This action updates a #${id} security`;
  }

  async remove(id: string) {
    return this.securitiesRepository.delete({ id: id });
  }
}
