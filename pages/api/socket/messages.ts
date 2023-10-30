import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "./io";
import Message from "@/models/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fromUserId, toUserId, text, seen } = await req.body;
    console.log({ fromUserId, toUserId, text, seen });
    if (!fromUserId || !toUserId || !text) {
      return res
        .status(400)
        .json({ message: "Please fill in all the required fields" });
    }

    const message = new Message({
      fromUserId,
      toUserId,
      text,
      seen,
    });

    await message.save().then((m: any) =>
      m.populate([
        { path: "fromUserId", select: "-password" },
        { path: "toUserId", select: "-password" },
      ])
    );

    res.socket.server.io.emit(`${fromUserId}:messages`, message);
    res.socket.server.io.emit(`${toUserId}:messages`, message);
    console.log(`${toUserId}:messages`, message);

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ messsage: "Something went wrong" });
  }
}
