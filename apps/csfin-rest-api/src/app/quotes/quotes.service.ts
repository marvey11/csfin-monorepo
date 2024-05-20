import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SecuritiesExchange } from "../exchanges/entities/exchange.entity";
import { Security } from "../securities/entities/security.entity";
import {
  CreateManyQuotesDto,
  CreateQuoteDataDto,
  QuoteDataItem,
} from "./dto/create-quote.dto";
import { UpdateQuoteDto } from "./dto/update-quote.dto";
import { QuoteData } from "./entities/quote.entity";

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
    @InjectRepository(QuoteData)
    private quotesRepository: Repository<QuoteData>,
    @InjectRepository(Security)
    private securitiesRepository: Repository<Security>,
    @InjectRepository(SecuritiesExchange)
    private exchangesRepository: Repository<SecuritiesExchange>
  ) {}

  async create(createDTO: CreateQuoteDataDto | CreateManyQuotesDto) {
    const { isin, exchangeName } = createDTO;
    return this.securitiesRepository
      .findOneByOrFail({ isin: isin })
      .then(async (security) =>
        this.exchangesRepository
          .findOneByOrFail({ name: exchangeName })
          .then((exchange): Promise<QuoteData | QuoteData[]> => {
            if ("quoteItems" in createDTO) {
              return this.quotesRepository.save(
                createDTO.quoteItems.map((quoteData) =>
                  this.createQuoteData(security, exchange, quoteData)
                )
              );
            }

            const { date, price } = createDTO;
            return this.quotesRepository.save(
              this.createQuoteData(security, exchange, { date, price })
            );
          })
      )
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

  async update(id: string, updateDTO: UpdateQuoteDto) {
    return this.quotesRepository
      .findOneByOrFail({ id: id })
      .then((quoteData) => {
        return this.quotesRepository.save({ ...quoteData, ...updateDTO });
      });
  }

  async remove(id: string) {
    return this.quotesRepository.delete({ id: id });
  }

  /** Creates a single quote data instance and populates it with the provided data. */
  private createQuoteData(
    security: Security,
    exchange: SecuritiesExchange,
    quoteItem: QuoteDataItem
  ): QuoteData {
    const quoteData = this.quotesRepository.create();
    return { ...quoteData, ...quoteItem, security, exchange };
  }
}
