import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { PresenceService } from "./presence.service";
import { Server, Socket } from "socket.io";
import { socketAuthMiddleware } from "src/common/middlewares/socket-auth.middleware";
import { JwtService } from "@nestjs/jwt";

@WebSocketGateway({
  cors: {
    origin: ["*"],
    credentials: true,
  },
})
export class PresenceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly presenceService: PresenceService,
    private jwtService: JwtService,
  ) {}
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.use(socketAuthMiddleware(this.jwtService));
  }
  async handleConnection(client: Socket) {
    const user = client.data.user;
    if (!user) return;

    await this.presenceService.addUser(user.sub, client.id);
    console.log(this.presenceService.getOnlineUsers());
    this.server.emit(
      "online-users",
      await this.presenceService.getOnlineUsers(),
    );
  }
  async handleDisconnect(client: Socket) {
    await this.presenceService.removeUser(client.id);
    this.server.emit(
      "online-users",
      await this.presenceService.getOnlineUsers(),
    );
  }
}
