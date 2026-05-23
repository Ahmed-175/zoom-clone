import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

export function socketAuthMiddleware(jwt: JwtService) {
  return async (socket: Socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.headers?.token;

      if (!token) {
        return next(new Error("Unauthorized: No token provided"));
      }
      const payload = await jwt.verifyAsync(token);

      socket.data.user = payload;

      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);
      return next(new Error("Unauthorized: Invalid token"));
    }
  };
}
