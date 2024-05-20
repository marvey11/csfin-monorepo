import { PartialType } from "@nestjs/mapped-types";
import { CreateQuoteDataDto } from "./create-quote.dto";

export class UpdateQuoteDto extends PartialType(CreateQuoteDataDto) {}
