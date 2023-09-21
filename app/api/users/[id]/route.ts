import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

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
    let user = await User.findOne({
      _id: params.id,
    });

    // Remove the password field
    if (user) {
      delete user?._doc.password;
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
    const values = await request.json();
    let user;

    user = await User.updateOne(
      {
        _id: params.id,
      },
      values
    );

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
