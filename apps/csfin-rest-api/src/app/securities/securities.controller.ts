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
  create(@Body() dto: CreateSecurityDto) {
    return this.securitiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.securitiesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.securitiesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSecurityDto) {
    return this.securitiesService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.securitiesService.remove(id);
  }
}
