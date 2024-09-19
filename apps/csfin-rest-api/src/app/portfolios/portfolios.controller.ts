import { CreatePortfolioDto, UpdatePortfolioDto } from "@csfin-monorepo/core";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { PortfoliosService } from "./portfolios.service";

@Controller("portfolios")
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  async create(@Body() createDTO: CreatePortfolioDto) {
    return this.portfoliosService.create(createDTO);
  }

  @Get()
  async findAll() {
    return this.portfoliosService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.portfoliosService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDTO: UpdatePortfolioDto) {
    return this.portfoliosService.update(id, updateDTO);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.portfoliosService.remove(id);
  }
}
