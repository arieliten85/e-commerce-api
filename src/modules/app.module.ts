import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

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

    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: "mysql",
    //     host: "localhost",
    //     port: 3306,
    //     username: "root",
    //     password: "root",
    //     database: "e-commerce-demo",
    //     entities: [UserEntity],
    //     synchronize: false,
    //     autoLoadEntities: true,
    //   }),
    //   dataSourceFactory: async (options) => {
    //     return new DataSource(options).initialize();
    //   },
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
