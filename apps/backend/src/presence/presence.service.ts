import { Injectable } from "@nestjs/common";

@Injectable()
export class PresenceService {
  private onlineUsers = new Map<string, Set<string>>();

  addUser(userId: string, socketId: string) {
    if (!this.onlineUsers.has(userId)) {
      this.onlineUsers.set(userId, new Set());
    }
    this.onlineUsers.get(userId)?.add(socketId);
  }

  removeUser(socketId: string) {
    for (const [userId, sockets] of this.onlineUsers.entries()) {
      if (sockets.has(socketId)) {
        sockets.delete(socketId);

        if (sockets.size === 0) {
          this.onlineUsers.delete(userId);
        }

        break;
      }
    }
  }

  getOnlineUsers() {
    return Array.from(this.onlineUsers.keys());
  }
}
