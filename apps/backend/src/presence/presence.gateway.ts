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
  handleConnection(client: Socket) {
    const user = client.data.user;
    console.log(user);
    if (!user) return;

    this.presenceService.addUser(user.sub, client.id);

    this.server.emit("online-users", this.presenceService.getOnlineUsers());
  }
  handleDisconnect(client: Socket) {
    this.presenceService.removeUser(client.id);
    this.server.emit("online-users", this.presenceService.getOnlineUsers());
  }
}
