import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SecurityTransaction } from "../../transactions/entities/transaction.entity";

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => SecurityTransaction, (transaction) => transaction.portfolio)
  transactions: SecurityTransaction[];
}
