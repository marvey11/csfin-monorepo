import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "@csfin-monorepo/core";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createDTO: CreateTransactionDto) {
    return this.transactionsService.create(createDTO);
  }

  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.transactionsService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDTO: UpdateTransactionDto
  ) {
    return this.transactionsService.update(id, updateDTO);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.transactionsService.remove(id);
  }
}
