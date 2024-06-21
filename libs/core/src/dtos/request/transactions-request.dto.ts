import { TransactionData } from "../../types";

type CreateTransactionDto = TransactionData;

type UpdateTransactionDto = Partial<CreateTransactionDto>;

export type { CreateTransactionDto, UpdateTransactionDto };
