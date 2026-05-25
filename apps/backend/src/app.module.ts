import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import config from "./common/config/config";
import { PrismaModule } from "./prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";
import { ChatModule } from "./chat/chat.module";
import { PresenceModule } from "./presence/presence.module";
import { MeetingsModule } from "./meetings/meetings.module";

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    PresenceModule,
    MeetingsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
