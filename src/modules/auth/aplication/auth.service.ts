import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "../controllers/dto/RegisterDto";
import {
  USER_REPOSITORY,
  UserRepository,
} from "src/modules/user/aplication/repository/user.repository";

import * as bcrypt from "bcrypt";
import { MapperUserService } from "src/modules/user/aplication/mappers/user.mapper";
import { LoginDto } from "../controllers/dto/LoginDto";
import { JwtService } from "@nestjs/jwt";
type IResgister = {
  message: string;
};
export const ERROR_MESSAGES = {
  ERROR_EMAIL_EXISTS: "Email already exists",
  USER_INVALID: "User invalid",
};
@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly mapperUserService: MapperUserService,

    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IResgister> {
    const userExist = await this.userRepository.finByEmail(registerDto.email);

    if (userExist) {
      throw new BadRequestException(ERROR_MESSAGES.ERROR_EMAIL_EXISTS);
    }
    const userResgisterClass = this.mapperUserService.dtoToClass(registerDto);
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      registerDto.password,
      saltOrRounds,
    );
    userResgisterClass.password = hashedPassword;
    await this.userRepository.create(userResgisterClass);

    return {
      message: "User created successfully",
    };
  }
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.finByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_INVALID);
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(ERROR_MESSAGES.USER_INVALID);
    }

    const payload = {
      name: user.firstName,
      lasName: user.lastName,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
}
