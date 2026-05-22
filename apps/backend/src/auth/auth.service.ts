import { Injectable } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { ConfigService } from "@nestjs/config";

import { UsersService } from "src/users/users.service";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(userId: number) {
    return this.jwtService.sign(
      {
        sub: userId,
      },
      {
        secret: this.configService.get<string>("JWT_SECRET"),
      },
    );
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.create(dto);
    const access_token = this.generateToken(user.id);
    return {
      user,
      access_token,
    };
  }

  async login(dto : LoginDto){
    const user = await this.usersService.validateUser(dto); 
    const access_token = this.generateToken(user.id);

    return {
      user , 
      access_token
    }
  }
}
