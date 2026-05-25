import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class MeetingsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleDisconnect(client: Socket) {
    const meetingId = client.data.meetingId;

    if (!meetingId) return;

    client.to(meetingId).emit("user-left", {
      socketId: client.id,
    });
  }

  @SubscribeMessage("join-meeting")
  async handleJoinMeeting(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      meetingId: string;
    },
  ) {
    const { meetingId } = data;

    await client.join(meetingId);

    client.data.meetingId = meetingId;

    const room = this.server.sockets.adapter.rooms.get(meetingId);

    const users = room ? [...room].filter((id) => id !== client.id) : [];

    client.to(meetingId).emit("user-joined", {
      socketId: client.id,
    });

    return {
      users,
      socketId: client.id,
    };
  }


  @SubscribeMessage("offer")
  handleOffer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      to: string;
      meetingId: string;
      offer: RTCSessionDescriptionInit;
    },
  ) {
    this.server.to(data.to).emit("offer", {
      offer: data.offer,
      from: client.id,
      meetingId: data.meetingId,
    });
  }


  @SubscribeMessage("answer")
  handleAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      to: string;
      meetingId: string;
      answer: RTCSessionDescriptionInit;
    },
  ) {
    this.server.to(data.to).emit("answer", {
      answer: data.answer,
      from: client.id,
      meetingId: data.meetingId,
    });
  }

  // =========================
  // ICE Candidate
  // =========================
  @SubscribeMessage("ice-candidate")
  handleIceCandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      to: string;
      meetingId: string;
      candidate: RTCIceCandidateInit;
    },
  ) {
    this.server.to(data.to).emit("ice-candidate", {
      candidate: data.candidate,
      from: client.id,
      meetingId: data.meetingId,
    });
  }
}
