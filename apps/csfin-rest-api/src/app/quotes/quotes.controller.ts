import {
  CreateManyQuotesDto,
  CreateQuoteDataDto,
  UpdateQuoteDto,
} from "@csfin-monorepo/core";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { FindAllQueryParams, QuotesService } from "./quotes.service";

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async create(@Body() createDto: CreateQuoteDataDto | CreateManyQuotesDto) {
    return this.quotesService.create(createDto);
  }

  @Get()
  async findAll(@Query() query?: FindAllQueryParams) {
    return this.quotesService.getQuotesForAll(query);
  }

  @Get("isin/:isin")
  async getQuotesForISIN(
    @Param("isin") isin: string,
    @Query() query?: FindAllQueryParams
  ) {
    return this.quotesService.getQuotesForISIN(isin, query);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.quotesService.remove(id);
  }
}
