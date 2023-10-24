import Message from "@/models/Message";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  // create message
  try {
    const { fromUserId, toUserId, text, seen } = await request.json();
    console.log({ fromUserId, toUserId, text, seen });
    if (!fromUserId || !toUserId || !text) {
      return NextResponse.json(
        { message: "Please fill in all the required fields" },
        { status: 400 }
      );
    }

    const message = new Message({
      fromUserId,
      toUserId,
      text,
      seen,
    });
    await message.save();

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for new message:", error);
    return NextResponse.json(
      { message: "Required fields are missing for new message" },
      { status: 400 }
    );
  }
}
