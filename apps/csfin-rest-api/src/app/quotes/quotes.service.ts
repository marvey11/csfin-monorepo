import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Security } from "../securities/entities/security.entity";
import { CreateManyQuotesDto, CreateQuoteDto } from "./dto/create-quote.dto";
import { UpdateQuoteDto } from "./dto/update-quote.dto";
import { Quote } from "./entities/quote.entity";

interface FindISINOnly {
  isin: string;
}

interface FindISINWithMaxCount {
  isin: string;
  limit: number;
}

interface FindISINFromDate {
  isin: string;
  "min-date": Date;
}

export type FindAllQueryParams =
  | FindISINOnly
  | FindISINWithMaxCount
  | FindISINFromDate;

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quotesRepository: Repository<Quote>,
    @InjectRepository(Security)
    private securitiesRepository: Repository<Security>
  ) {}

  async create(
    dto: CreateQuoteDto | CreateManyQuotesDto
  ): Promise<Quote | Quote[]> {
    const { isin } = dto;
    return this.securitiesRepository
      .findOneByOrFail({ isin: isin })
      .then((security): Promise<Quote | Quote[]> => {
        if ("quoteItems" in dto) {
          return this.quotesRepository.save(
            dto.quoteItems.map((quote): Quote => {
              const priceItem = this.quotesRepository.create();
              return { ...priceItem, ...quote, security: security };
            })
          );
        } else {
          const { price, date } = dto;
          const priceItem = this.quotesRepository.create();
          return this.quotesRepository.save({
            ...priceItem,
            date,
            price,
            security: security,
          });
        }
      })
      .catch(() => {
        throw { message: `Could not create quote entity for ISIN ${isin}` };
      });
  }

  async findAll(query: FindAllQueryParams) {
    const queryBuilder = this.quotesRepository
      .createQueryBuilder("quote")
      .innerJoin("quote.security", "security")
      .select(["quote.id AS id", "quote.date AS date", "quote.price AS price"])
      .addSelect("security.isin", "isin");

    if ("isin" in query) {
      queryBuilder.where("security.isin = :isin", { isin: query.isin });
    }

    queryBuilder.orderBy("quote.date", "DESC");

    if ("limit" in query) {
      queryBuilder.limit(query.limit);
    } else if ("min-date" in query) {
      queryBuilder.andWhere("quote.date >= :minDate", {
        minDate: query["min-date"],
      });
    }

    return queryBuilder.getRawMany();
  }

  async findOne(id: string) {
    return this.quotesRepository.findOneBy({ id: id });
  }

  update(id: string, updateQuoteDto: UpdateQuoteDto) {
    return `This action updates a #${id} quote`;
  }

  async remove(id: string) {
    return this.quotesRepository.delete({ id: id });
  }
}
