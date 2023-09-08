import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "../aplication/services/user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../domain/user.domain";

@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string): Promise<User> {
    return this.userService.findById(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param("id") id: string): Promise<string> {
    return this.userService.delete(+id);
  }
}
