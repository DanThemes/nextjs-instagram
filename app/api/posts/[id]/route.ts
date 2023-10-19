import Comment from "@/models/Comment";
import Media, { MediaType } from "@/models/Media";
import Post from "@/models/Post";
import User from "@/models/User";
import dbConnect from "@/utils/db";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getPostMedia } from "@/utils/api";
import { utapi } from "@/utils/uploadthing";

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

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving the post", error);
    return NextResponse.json(
      { message: "Error while retrieving the post" },
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
    const body = await request.json();

    const session = await getServerSession(authOptions);
    const post = await Post.findOne({ _id: params.id });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 400 });
    }

    if (session?.user.id !== post.userId.toString()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // toggle like
    if ("userId" in body) {
      if (post.likes.includes(body.userId)) {
        post.likes = post.likes.filter(
          (like: Types.ObjectId) => like.toString() !== body.userId
        );
      } else {
        post.likes.push(body.userId);
      }
      await post.save();
      return NextResponse.json(
        { message: "Action successful" },
        { status: 200 }
      );
    }

    // enable/disable comments
    if ("commentsDisabled" in body) {
      post.commentsDisabled = body.commentsDisabled;
      await post.save();
      return NextResponse.json(
        { message: "Action successful" },
        { status: 200 }
      );
    }

    // show/hide like count
    if ("hideLikes" in body) {
      post.hideLikes = body.hideLikes;
      await post.save();
      return NextResponse.json(
        { message: "Action successful" },
        { status: 200 }
      );
    }

    // edit post
    if ("editPost" in body) {
      console.log({ editMediaasaaaaa: body.editPost.media });

      // Transform the MediaType[] into ObjectId[]
      const mediaArray = body.editPost.media.map((item: MediaType) => item._id);

      // Delete the files that have been added to the post
      // but are not anymore in the new edited version of the post
      const deleteFilesPromises = post.media.map(
        async (mediaId: Types.ObjectId) => {
          if (!mediaArray.includes(mediaId)) {
            const mediaDoc = await getPostMedia(mediaId);
            console.log({ mediaDoc });
            const lastIndex = mediaDoc.url.lastIndexOf("/");
            const key = mediaDoc.url.substring(lastIndex + 1);
            console.log({ keyToDelete: key });

            // line below generates the issue
            // fix something in the /utils/uploadthing.ts file
            return new Promise((resolve) => resolve({ success: true }));
            // return await utapi.deleteFiles(key);
          }
          return null;
        }
      );

      const filesToBeDeleted = await Promise.all(deleteFilesPromises);
      console.log({ filesToBeDeleted });

      console.log({ editPostMedia: body.editPost.media });
      post.media = mediaArray;
      post.caption = body.editPost.caption;
      await post.save();
      return NextResponse.json(
        { message: "Action successful" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Request body is invalid" },
      { status: 400 }
    );
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

  try {
    const session = await getServerSession(authOptions);
    const post = await Post.findOne({ _id: params.id });

    if (!post) {
      throw new Error("Post doesn't exist");
    }

    // only owner can delete
    if (session?.user.id !== post.userId.toString()) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // delete the postId from the User's post field
    const user = await User.findOne({ _id: post.userId });
    if (user) {
      user.posts = user.posts.filter(
        (postId: string) => postId.toString() !== params.id
      );
      await user.save();
    }

    // delete the post
    await Post.deleteOne({ _id: params.id });

    return NextResponse.json({ message: "Action successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
