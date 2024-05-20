import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SecuritiesExchange } from "../../exchanges/entities/exchange.entity";
import { Security } from "../../securities/entities/security.entity";

@Entity()
@Index(["security.id", "exchange.id", "date"], { unique: true })
export class QuoteData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "numeric" })
  price: number;

  @ManyToOne(() => Security, (security) => security.quotes, {
    onDelete: "CASCADE",
  })
  security: Security;

  @ManyToOne(() => SecuritiesExchange, (exchange) => exchange.quotes, {
    onDelete: "CASCADE",
  })
  exchange: SecuritiesExchange;
}
