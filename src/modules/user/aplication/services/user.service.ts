import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "../../controllers/dto/create-user.dto";
import { UpdateUserDto } from "../../controllers/dto/update-user.dto";

import { User } from "../../domain/user.domain";
import { MapperUserService } from "../mappers/user.mapper";
import { USER_REPOSITORY } from "../repository/user.repository";
import { UserMysqlRepository } from "../../infrastructure/user.mysql.repository";

export const ERROR_MESSAGES = {
  ERROR_CREATE: "Error creating the user",
  ERROR_FIND_ALL: "Error retrieving users",
  ERROR_FIND_BY_ID: "Error retrieving the user",
  ERROR_UPDATE: "Error updating the user",
  ERROR_DELETE: "Error deleting the user",
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
    try {
      const userClass = this.mapperUserService.dtoToClass(createUserDto);
      return await this.userMysqlRepository.create(userClass);
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.ERROR_CREATE,
        error,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userMysqlRepository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.ERROR_FIND_ALL,
        error,
      );
    }
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
