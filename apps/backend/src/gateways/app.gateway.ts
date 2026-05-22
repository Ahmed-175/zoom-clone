import { JwtService } from "@nestjs/jwt";
import { OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "src/common/middlewares/socket-auth.middleware";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class AppGateway implements OnGatewayInit {
  constructor(private jwtService: JwtService) {}

  afterInit(server: Server) {
    server.use(socketAuthMiddleware(this.jwtService));
  }
}
