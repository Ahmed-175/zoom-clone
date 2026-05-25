import { INestApplicationContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server } from "socket.io";

import { PrismaService } from "src/prisma/prisma.service";
import { socketAuthMiddleware } from "../middlewares/socket-auth.middleware";

export class AuthSocketIoAdapter extends IoAdapter {
  private jwtService: JwtService;
  private prisma: PrismaService;

  constructor(app: INestApplicationContext) {
    super(app);

    this.jwtService = app.get(JwtService);
    this.prisma = app.get(PrismaService);
  }

  createIOServer(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);

    server.use(socketAuthMiddleware(this.jwtService));

    return server;
  }
}
