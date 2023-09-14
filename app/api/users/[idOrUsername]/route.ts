import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

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
    const isID = mongoose.isValidObjectId(idOrUsername);
    let user;

    if (isID) {
      user = await User.findOne({
        _id: idOrUsername,
      });
    } else {
      user = await User.findOne({
        username: idOrUsername,
      });
    }

    // Remove the password field
    if (user) {
      delete user?._doc.password;
      return NextResponse.json({ user }, { status: 200 });
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

  const idOrUsername = params.idOrUsername;

  // check auth here

  try {
    const values = await request.json();
    const isID = mongoose.isValidObjectId(idOrUsername);
    let user;

    if (isID) {
      user = await User.updateOne(
        {
          _id: idOrUsername,
        },
        values
      );
    } else {
      user = await User.updateOne(
        {
          username: idOrUsername,
        },
        values
      );
    }

    console.log({ values, user });

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
