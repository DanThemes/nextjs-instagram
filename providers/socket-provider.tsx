"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
  notifications: string[];
  setNotifications: React.Dispatch<React.SetStateAction<string[]>>;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  notifications: [],
  setNotifications: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io(process.env.NEXTAUTH_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      transports: ["polling", "websocket"],

      // forceNew: true,
    });

    socketInstance.on("connect", () => {
      console.log("connected");
      console.log({ socketId: socketInstance.id });
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("disconnected");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", () => {
      console.log("connect error");
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, notifications, setNotifications }}
    >
      {children}
    </SocketContext.Provider>
  );
};
