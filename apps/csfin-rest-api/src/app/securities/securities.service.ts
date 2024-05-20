import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { escape } from "querystring";
import { Repository } from "typeorm";
import { CreateSecurityDto, UpdateSecurityDto } from "./dto";
import { Security } from "./entities/security.entity";

@Injectable()
export class SecuritiesService {
  constructor(
    @InjectRepository(Security)
    private securitiesRepository: Repository<Security>
  ) {}

  async create(
    createDTO: CreateSecurityDto | CreateSecurityDto[]
  ): Promise<Security | Security[]> {
    const decodeDto = (dto: CreateSecurityDto) => ({
      ...dto,
      name: decodeURIComponent(escape(dto.name)),
      shortName: decodeURIComponent(escape(dto.shortName)),
    });

    return Array.isArray(createDTO)
      ? this.securitiesRepository.save(createDTO.map(decodeDto))
      : this.securitiesRepository.save(decodeDto(createDTO));
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
