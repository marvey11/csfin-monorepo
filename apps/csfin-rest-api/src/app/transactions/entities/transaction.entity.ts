import { TransactionType } from "@csfin-monorepo/core";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Portfolio } from "../../portfolios/entities/portfolio.entity";
import { Security } from "../../securities/entities/security.entity";

@Entity()
export class SecurityTransaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: TransactionType })
  type: TransactionType;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "numeric" })
  shares: number;

  @Column({ type: "numeric" })
  price: number;

  @ManyToOne(() => Security, (security) => security.transactions)
  security: Security;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.transactions)
  portfolio: Portfolio;
}
