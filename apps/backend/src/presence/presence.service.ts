import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class PresenceService {
  constructor(
    @Inject("REDIS_CLIENT")
    private redis: Redis,
  ) {}

  async addUser(userId: string, socketId: string) {
    await this.redis.set(`socket:${socketId}`, userId);

    await this.redis.sadd("online-users", userId);
  }

  async removeUser(socketId: string) {
    const userId = await this.redis.get(`socket:${socketId}`);

    if (userId) {
      await this.redis.srem("online-users", userId);
    }

    await this.redis.del(`socket:${socketId}`);
  }

  async getOnlineUsers() {
    return this.redis.smembers("online-users");
  }
}
