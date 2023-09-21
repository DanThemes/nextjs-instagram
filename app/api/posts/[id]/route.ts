import Post from "@/models/Post";
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
    const post = await Post.findOne({ _id: params.id });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (like: Types.ObjectId) => like.toString() !== userId
      );
    } else {
      post.likes.push(userId);
    }
    const r = await post.save();
    console.log({ r });
    return NextResponse.json({ message: "Action successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
