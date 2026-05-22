import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

export function socketAuthMiddleware(jwt: JwtService) {
  return async (socket: Socket, next) => {
    try {
      // 1. Try to get token from different sources
      const token =
        socket.handshake.auth?.token || socket.handshake.headers?.token;

      console.log(token);

      // 2. If no token → reject connection
      if (!token) {
        return next(new Error("Unauthorized: No token provided"));
      }
      // 3. Verify JWT token
      const payload = await jwt.verifyAsync(token);

      console.log(payload);
      // 4. Attach user to socket instance
      socket.data.user = payload;

      // 5. Allow connection
      next();
    } catch (error) {
      // 6. Any error → reject connection
      console.log("JWT ERROR:", error.message);
      return next(new Error("Unauthorized: Invalid token"));
    }
  };
}
