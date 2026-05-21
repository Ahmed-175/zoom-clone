import { Body, Controller, Post, Res } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

import type { Response } from "express";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() data: RegisterDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.register(data);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      user,
    });
  }

  @Post("/login")
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.login(data);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      user,
    });
  }
}
