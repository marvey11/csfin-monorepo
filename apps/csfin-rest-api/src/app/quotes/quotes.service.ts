import {
  CreateManyQuotesDto,
  CreateQuoteDataDto,
  ExchangeResponse,
  QuoteDataItem,
  SingleSecurityQuoteResponse,
  UpdateQuoteDto,
} from "@csfin-monorepo/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SecuritiesExchange } from "../exchanges/entities/exchange.entity";
import { Security } from "../securities/entities/security.entity";
import { QuoteData } from "./entities/quote.entity";

export type FindAllQueryParams = { limit: number } | { "min-date": Date };

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

  async getQuotesForAll(
    query?: FindAllQueryParams
  ): Promise<SingleSecurityQuoteResponse[]> {
    return this.securitiesRepository
      .find()
      .then((securities) =>
        Promise.all(
          securities.map((security) => this.getQuotesForOne(security, query))
        )
      );
  }

  async getQuotesForISIN(
    isin: string,
    query?: FindAllQueryParams
  ): Promise<SingleSecurityQuoteResponse> {
    return this.securitiesRepository
      .findOneByOrFail({ isin: isin })
      .then((security) => this.getQuotesForOne(security, query));
  }

  async getQuotesForOne(
    security: Security,
    query?: FindAllQueryParams
  ): Promise<SingleSecurityQuoteResponse> {
    return this.exchangesRepository
      .find()
      .then((exchanges) =>
        Promise.all(
          exchanges.map(
            async (exchange): Promise<ExchangeResponse> =>
              this.getQuoteData(security, exchange, query).then((quoteData) => {
                const { name } = exchange;
                return { name, quoteData };
              })
          )
        )
      )
      .then((exchangeResponses) => ({
        isin: security.isin,
        securityName: security.name,
        securityType: security.type,
        exchanges: exchangeResponses.filter(
          ({ quoteData }) => quoteData.length > 0
        ),
      }));
  }

  async getQuoteData(
    security: Security,
    exchange: SecuritiesExchange,
    query: FindAllQueryParams = { limit: 1000 }
  ): Promise<QuoteData[]> {
    const queryBuilder = this.quotesRepository
      .createQueryBuilder("quote")
      .innerJoin("quote.security", "security")
      .innerJoin("quote.exchange", "exchange")
      .where("security.id = :securityId", { securityId: security.id })
      .andWhere("exchange.id = :exchangeId", { exchangeId: exchange.id })
      .orderBy("quote.date", "DESC")
      .select(["quote.date", "quote.price"]);

    if (query) {
      if ("limit" in query) {
        queryBuilder.limit(query.limit);
      } else if ("min-date" in query) {
        queryBuilder.andWhere("quote.date >= :minDate", {
          minDate: query["min-date"],
        });
      }
    }

    return queryBuilder.getMany();
  }

  async update(id: string, updateDTO: UpdateQuoteDto) {
    return this.quotesRepository
      .findOneByOrFail({ id: id })
      .then((quoteData) =>
        this.quotesRepository.save({ ...quoteData, ...updateDTO } as QuoteData)
      );
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
