import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

import { LoginDto } from "./dto/login.dto";
import type { Request } from "express";
import { JwtGaurd } from "src/common/guards/jwt.graud";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post("login")
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @UseGuards(JwtGaurd)
  @Get("me")
  async profile(@Req() req: Request) {
    return req.user;
  }
}
