import Comment from "@/models/Comment";
import Media from "@/models/Media";
import Post from "@/models/Post";
import User from "@/models/User";
import dbConnect from "@/utils/db";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
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

  try {
    const post = await Post.findOne({ _id: params.id })
      .populate({ path: "media", model: Media })
      .populate({ path: "likes", select: ["-password"], model: User })
      .populate({
        path: "comments",
        model: Comment,
        populate: [
          {
            path: "userId",
            select: ["username", "profileImage"],
            model: User,
          },
          {
            path: "likes",
            select: ["-password"],
            model: User,
          },
        ],
      })
      .populate({
        path: "userId",
        select: ["username", "profileImage"],
        model: User,
      });

    console.log("b post", post);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving the post", error);
    return NextResponse.json(
      { message: "Error while retrieving the post" },
      { status: 400 }
    );
  }
}

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

  // create post
  try {
    const { userId, media, caption } = await request.json();
    if (!userId || !media || !caption) {
      return NextResponse.json(
        { message: "Please fill in all the required fields" },
        { status: 400 }
      );
    }

    console.log({ userId, media, caption });
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const post = new Post({ userId, media, caption, comments: [], likes: [] });
    await post.save();
    user.posts.push(post._id);
    console.log("ppp", user.posts);
    await user.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for post creation:", error);
    return NextResponse.json(
      { message: "Required fields are missing for post creation" },
      { status: 400 }
    );
  }
}

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
  console.log("delete", params);
  // check auth here
  try {
    const session = await getServerSession(authOptions);
    const post = await Post.findOne({ _id: params.id });

    if (!post) {
      throw new Error("Post doesn't exist");
    }

    if (session?.user.id === post.userId.toString()) {
      await Post.deleteOne({ _id: params.id });
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
