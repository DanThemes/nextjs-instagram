import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Media from "@/models/Media";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { idOrUsername: string } }
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

  const idOrUsername = params.idOrUsername;

  try {
    let userPromise;

    const isID = mongoose.isValidObjectId(idOrUsername);
    if (isID) {
      userPromise = User.findOne({
        _id: idOrUsername,
      });
    } else {
      userPromise = User.findOne({
        username: idOrUsername,
      });
    }

    console.log(1);
    const user = await userPromise
      .select("-password")
      .populate({
        path: "following",
        select: ["username", "profileImage"],
        model: User,
      })
      .populate({
        path: "followers",
        select: ["username", "profileImage"],
        model: User,
      });

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
    throw new Error("Invalid or missing user parameters");
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or missing user parameters" },
      { status: 400 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { idOrUsername: string } }
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
    const values = await request.json();
    let user;
    console.log("valuesvalues", values);

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // other user
    if ("followers" in values) {
      if (values.followers !== session.user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const getUser = await User.findOne({ _id: params.idOrUsername }).select(
        "followers"
      );
      if (getUser.followers.includes(values.followers)) {
        getUser.followers = getUser.followers.filter(
          (userId: string) => userId.toString() !== values.followers
        );
        await getUser.save();
      } else {
        getUser.followers.push(values.followers);
        await getUser.save();
      }
    }

    // logged-in user
    if ("following" in values) {
      const getUser = await User.findOne({
        _id: params.idOrUsername,
      }).select("following");

      // console.log({ getUser: getUser._id.toString(), id: session.user.id });
      if (getUser._id.toString() !== session.user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      console.log(" getUser.following", getUser.following);
      if (getUser.following.includes(values.following)) {
        console.log("getUser.following BEFORE", getUser.following);
        getUser.following = getUser.following.filter(
          (userId: string) => userId.toString() !== values.following
        );
        console.log("getUser.following AFTER", getUser.following);
        await getUser.save();
      } else {
        console.log("push");
        getUser.following.push(values.following);
        await getUser.save();
      }
    }

    // Delete these values to prevent overwriting
    delete values.following;
    delete values.followers;

    user = await User.updateOne(
      {
        _id: params.idOrUsername,
      },
      values
    );

    // console.log({ values, user });

    // Update successful
    if (user.modifiedCount > 0) {
      return NextResponse.json({ message: "User updated" }, { status: 200 }); // status 204 doesn't exist yet on NextResponse
    }
    return NextResponse.json(
      { message: "Invalid or missing user parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.log("Invalid or missing user parameters", error);
    return NextResponse.json(
      { message: "Invalid or missing user parameters" },
      { status: 400 }
    );
  }
}
