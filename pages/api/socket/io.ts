import { NextApiRequest } from "next";
import { NextServer } from "next/dist/server/next";
import { Server as HTTPServer } from "http";
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new Server(httpServer, {
      path,
      addTrailingSlash: false,
    });
  }
};
