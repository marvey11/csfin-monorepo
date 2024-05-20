import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateSecurityDto } from "./dto/create-security.dto";
import { UpdateSecurityDto } from "./dto/update-security.dto";
import { SecuritiesService } from "./securities.service";

@Controller("securities")
export class SecuritiesController {
  constructor(private readonly securitiesService: SecuritiesService) {}

  @Post()
  async create(@Body() createDto: CreateSecurityDto | CreateSecurityDto[]) {
    return this.securitiesService
      .create(createDto)
      .then((data) => data)
      .catch((error) => ({ message: error.message }));
  }

  @Get()
  async findAll() {
    return this.securitiesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.securitiesService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateSecurityDto) {
    return this.securitiesService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.securitiesService.remove(id);
  }
}
