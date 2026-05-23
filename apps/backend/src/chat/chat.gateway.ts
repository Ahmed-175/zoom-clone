import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { ChatService } from "./chat.service";

import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("send_message")
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: any,
  ) {
    const user = client.data.user;
    this.server.to(body.roomId).emit("receive_message", body.message);
  }

  @SubscribeMessage("join_room")
  async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    console.log(body);

    client.join(body.roomId);
  }
}
