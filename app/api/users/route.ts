import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

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

  try {
    const users = await User.find();

    // Remove the password field
    const safeUsers = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    return NextResponse.json({ users: safeUsers }, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving the users' list", error);
    return NextResponse.json(
      { message: "Error while retrieving the users' list" },
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

  // create the user
  try {
    const { username, email, password, ...rest } = await request.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Please fill in all the required fields" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      ...rest,
    });
    await user.save();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for user creation:", error);
    return NextResponse.json(
      { message: "Required fields are missing for user creation" },
      { status: 400 }
    );
  }
}
