import Comment from "@/models/Comment";
import dbConnect from "@/utils/db";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    return NextResponse.json({ message: "Action successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function DELETE(
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
    const session = await getServerSession(authOptions);
    const comment = await Comment.findOne({ _id: params.id });

    if (!comment) {
      throw new Error("Comment doesn't exist");
    }

    if (session?.user.id === comment.userId.toString()) {
      await Comment.deleteOne({ _id: params.id });
      return NextResponse.json(
        { message: "Action successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
