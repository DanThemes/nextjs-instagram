import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Media from "@/models/Media";
import Post from "@/models/Post";
import Comment from "@/models/Comment";

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

    if ("followers" in values) {
      const getUser = await User.findOne({ _id: params.idOrUsername }).select(
        "followers"
      );
      if (!getUser.followers.includes(values.followers[0])) {
        getUser.followers.push(values.followers[0]);
        await getUser.save();
      }
    }

    if ("following" in values) {
      const getUser = await User.findOne({
        _id: params.idOrUsername,
      }).select("following");

      if (!getUser.following.includes(values.following[0])) {
        getUser.following.push(values.following[0]);
        await getUser.save();
      }
    }

    // Remove followers and following from values object to avoid overwriting
    delete values.followers;
    delete values.following;

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
