import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Security } from "../../securities/entities/security.entity";

@Entity()
export class Quote {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date", unique: true })
  date: Date;

  @Column({ type: "numeric" })
  quote: number;

  @ManyToOne(() => Security, (security) => security.quotes, {
    onDelete: "CASCADE",
  })
  security: Security;
}
