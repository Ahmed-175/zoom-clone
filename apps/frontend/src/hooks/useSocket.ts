import { useContext } from "react";
import { SocketContext } from "../contexts/socket.context";

const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("socket context not defined");
  }

  return context;
};

export default useSocket;
