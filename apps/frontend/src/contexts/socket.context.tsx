import { createContext, useEffect, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  activeUsers: any[];
}

export const SocketContext =
  createContext<ISocketContext | null>(null);

export const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_URL_SOCKET, {
      auth: {
        token: localStorage.getItem("access_token"),
      },
    });

    const socket = socketRef.current;

    socket.on("online-users", (data) => {
      setActiveUsers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        activeUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};