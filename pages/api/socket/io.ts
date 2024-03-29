import { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as NetServer, Socket as NetSocket } from "net";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
      pingInterval: 5000,
      transports: ["polling", "websocket"],
    });

    io.on("connection", (socket) => {
      io.emit(`65008b696a3bf3b657a85cca:messages`, {
        newMessage: 123,
        fromUserId: { _id: "2222" },
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
