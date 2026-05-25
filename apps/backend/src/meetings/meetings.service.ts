import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MeetingsService {
  constructor(private readonly prismaSevice: PrismaService) {}

  async create(userId: number) {
    const meetingId = randomUUID();
    await this.prismaSevice.meeting.create({
      data: {
        roomId: meetingId,
        creatorId: userId,
        title: "New Meeting",
      },
    });

    return meetingId;
  }
}
