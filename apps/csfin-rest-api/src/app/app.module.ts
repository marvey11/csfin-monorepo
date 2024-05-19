import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Quote } from "./quotes/entities/quote.entity";
import { QuotesModule } from "./quotes/quotes.module";
import { Security } from "./securities/entities/security.entity";
import { SecuritiesModule } from "./securities/securities.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "codescape",
      password: "password",
      database: "codescape-financial",
      entities: [Quote, Security],
      synchronize: true,
    }),
    QuotesModule,
    SecuritiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
