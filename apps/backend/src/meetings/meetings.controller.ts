import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { MeetingsService } from "./meetings.service";
import type { Request } from "express";
import { JwtGaurd } from "src/common/guards/jwt.graud";

@Controller("meetings")
export class MeetingsController {
  constructor(private meetingService: MeetingsService) {}

  @UseGuards(JwtGaurd)
  @Get("create")
  async createMeeting(@Req() req: Request) {
    if (!req.user) {
      throw new Error("User is not authorizeted ");
    }
    const user: any = req.user;
    return {
      meetingId: await this.meetingService.create(user.id),
    };
  }
}
