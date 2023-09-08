import { Module } from "@nestjs/common";
import { AuthService } from "./aplication/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { USER_REPOSITORY } from "../user/aplication/repository/user.repository";
import { UserMysqlRepository } from "../user/infrastructure/user.mysql.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/infrastructure/entities/user.entity";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: USER_REPOSITORY, useClass: UserMysqlRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
