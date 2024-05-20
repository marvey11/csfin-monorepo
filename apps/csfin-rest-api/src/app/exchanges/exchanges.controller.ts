import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateExchangeDto } from "./dto/create-exchange.dto";
import { UpdateExchangeDto } from "./dto/update-exchange.dto";
import { ExchangesService } from "./exchanges.service";

@Controller("exchanges")
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Post()
  async create(@Body() createDto: CreateExchangeDto | CreateExchangeDto[]) {
    return this.exchangesService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.exchangesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.exchangesService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateExchangeDto: UpdateExchangeDto
  ) {
    return this.exchangesService.update(id, updateExchangeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.exchangesService.remove(id);
  }
}
