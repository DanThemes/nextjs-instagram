import Post from "@/models/Post";
import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

  // console.log({ searchParams: request.nextUrl.searchParams });
  const userId = request.nextUrl.searchParams.get("userId");
  const onlyFollowingUsersPosts =
    request.nextUrl.searchParams.get("onlyFollowingUsersPosts") === "false"
      ? false
      : true;

  console.log("GET", userId, onlyFollowingUsersPosts);

  try {
    let posts;
    // Get all posts of the users followed by a specific user
    if (userId && onlyFollowingUsersPosts) {
      const usersFollowedList = await User.find({ _id: userId }).select(
        "following"
      );
      console.log({ usersFollowedList: usersFollowedList[0].following });
      posts = await Post.find({
        userId: { $in: usersFollowedList[0].following },
      }).populate(["media", "likes"]);
    }
    // Get all posts of a user
    else if (userId) {
      posts = await Post.find({ userId: userId }).populate(["media", "likes"]);
    }
    // Get all posts
    else {
      posts = await Post.find().populate(["media", "likes"]);
    }
    console.log({ posts });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving the posts", error);
    return NextResponse.json(
      { message: "Error while retrieving the posts" },
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
    const post = new Post({ userId, media, caption, comments: [], likes: [] });
    await post.save();

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for post creation:", error);
    return NextResponse.json(
      { message: "Required fields are missing for post creation" },
      { status: 400 }
    );
  }
}