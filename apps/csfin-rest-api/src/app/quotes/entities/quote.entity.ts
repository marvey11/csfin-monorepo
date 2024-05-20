import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SecuritiesExchange } from "../../exchanges/entities/exchange.entity";
import { Security } from "../../securities/entities/security.entity";

@Entity()
export class QuoteData {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", unique: true })
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
