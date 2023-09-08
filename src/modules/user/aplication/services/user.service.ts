import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../../controllers/dto/create-user.dto";
import { UpdateUserDto } from "../../controllers/dto/update-user.dto";

import { User } from "../../domain/user.domain";
import { MapperUserService } from "../mappers/user.mapper";
import { USER_REPOSITORY } from "../repository/user.repository";
import { UserMysqlRepository } from "../../infrastructure/user.mysql.repository";

export const ERROR_MESSAGES = {
  ERROR_EMAIL_EXISTS: "Email already exists",

  USER_NOT_FOUND: "User not found",
};

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userMysqlRepository: UserMysqlRepository,
    private readonly mapperUserService: MapperUserService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userClass = this.mapperUserService.dtoToClass(createUserDto);
    return await this.userMysqlRepository.create(userClass);
  }

  async findAll(): Promise<User[]> {
    return await this.userMysqlRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    const userFound = await this.userMysqlRepository.findById(id);
    if (!userFound) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.userMysqlRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const newUserClass = this.mapperUserService.dtoToClass(updateUserDto);
    return await this.userMysqlRepository.update(foundUser, newUserClass);
  }
  async delete(id: number): Promise<string> {
    const foundUser = await this.userMysqlRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    this.userMysqlRepository.delete(id);
    return `The ID ${id} has been deleted`;
  }
}
