import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TestModule } from "./test/test.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "e-commerce-demo",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
