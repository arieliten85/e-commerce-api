import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
} from "@nestjs/common";
import { AuthService } from "../aplication/auth.service";

import { RegisterDto } from "./dto/RegisterDto";
import { LoginDto } from "./dto/LoginDto";
import { AuthGuard } from "../guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @UseGuards(AuthGuard)
  @Get("profile")
  profile(@Request() req) {
    const user = req.user;
    return user;
  }
}
