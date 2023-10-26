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
      })
      .sort({ createdAt: 1 });

    const users = messages.map((message) => {
      if (message.fromUserId._id.toString() === params.userId) {
        return message.toUserId;
      }
      return message.fromUserId;
    });

    // Remove duplicates
    const uniqueUsersIds: string[] = [];
    const uniqueUsers = users.filter((user) => {
      if (!uniqueUsersIds.includes(user._id.toString())) {
        uniqueUsersIds.push(user._id.toString());
        return true;
      }
      return false;
    });
    // console.log({ uniqueUsersIds, uniqueUsers });

    return NextResponse.json({ users: uniqueUsers, messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
