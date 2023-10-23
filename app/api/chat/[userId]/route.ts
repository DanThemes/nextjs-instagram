import Message from "@/models/Message";
import User, { UserType } from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  // connect to the database
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }

  try {
    const messages = await Message.find({
      $or: [{ fromUserId: params.userId }, { toUserId: params.userId }],
    })
      .populate<{ fromUserId: UserType }>({
        path: "fromUserId",
        select: "-password",
        model: User,
      })
      .populate<{ toUserId: UserType }>({
        path: "toUserId",
        select: "-password",
        model: User,
      });

    const users = messages.map((message) => {
      if (message.fromUserId === params.userId) {
        return message.fromUserId;
      }
      return message.toUserId;
    });

    return NextResponse.json({ users, messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
