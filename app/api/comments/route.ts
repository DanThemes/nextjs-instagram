import Comment from "@/models/Comment";
import Post from "@/models/Post";
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

  // create comment
  try {
    const { postId, text, userId, parentCommentId } = await request.json();
    if (!postId || !text || !userId) {
      return NextResponse.json(
        { message: "Please fill in all the required fields" },
        { status: 400 }
      );
    }

    const comment = new Comment({
      postId,
      text,
      userId,
      parentCommentId: parentCommentId || null,
      comments: [],
      likes: [],
    });
    await comment.save();

    console.log("serv com", comment);

    // Add the comment id to the post's comments array
    const post = await Post.findOne({ _id: postId });
    post.comments.push(comment._id);
    await post.save();

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for new comment:", error);
    return NextResponse.json(
      { message: "Required fields are missing for new comment" },
      { status: 400 }
    );
  }
}
