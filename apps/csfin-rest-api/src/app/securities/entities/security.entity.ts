import { SecurityType } from "@csfin-monorepo/core";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QuoteData } from "../../quotes/entities/quote.entity";

@Entity()
@Index(["isin", "nsin"], { unique: true })
export class Security {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  isin: string;

  @Column()
  nsin: string;

  @Column()
  name: string;

  @Column({ name: "short_name", nullable: true })
  shortName: string;

  @Column({ type: "enum", enum: SecurityType })
  type: SecurityType;

  @OneToMany(() => QuoteData, (quote) => quote.security)
  quotes: QuoteData[];
}
