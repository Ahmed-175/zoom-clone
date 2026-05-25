import { Module } from "@nestjs/common";
import { MeetingsService } from "./meetings.service";
import { MeetingsGateway } from "./meetings.gateway";
import { MeetingsController } from "./meetings.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [MeetingsGateway, MeetingsService],
  controllers: [MeetingsController],
})
export class MeetingsModule {}
