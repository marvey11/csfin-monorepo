import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuoteData } from "../../quotes/entities/quote.entity";

@Entity()
export class SecuritiesExchange {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => QuoteData, (quote) => quote.exchange)
  quotes: QuoteData[];
}
