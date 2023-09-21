import Comment from "@/models/Comment";
import User from "@/models/User";
import dbConnect from "@/utils/db";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
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

  // check auth here

  try {
    const { userId } = await request.json();
    const comment = await Comment.findOne({ _id: params.id });

    if (comment.likes.includes(userId)) {
      comment.likes = comment.likes.filter(
        (like: Types.ObjectId) => like.toString() !== userId
      );
    } else {
      comment.likes.push(userId);
    }
    const r = await comment.save();
    console.log({ rComments: r });
    return NextResponse.json({ message: "Action successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
