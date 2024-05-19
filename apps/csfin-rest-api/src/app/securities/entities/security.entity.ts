import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quote } from "../../quotes/entities/quote.entity";
import { SecurityType } from "../dto/create-security.dto";

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

  @OneToMany(() => Quote, (quote) => quote.security)
  quotes: Quote[];
}
