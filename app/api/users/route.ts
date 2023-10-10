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
    const users = await User.find().select("-password");
    return NextResponse.json({ users }, { status: 200 });
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

  try {
    const body = await request.json();

    // Get a list of users
    if (Array.isArray(body)) {
      const users = await User.find({ _id: { $in: body } });
      return NextResponse.json(users, { status: 200 });
    }

    // Or create a new user
    const { username, email, password, ...rest } = body;
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
      profileImage: "/avatar.jpg",
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
