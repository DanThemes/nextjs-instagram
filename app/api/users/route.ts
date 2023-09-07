import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: ["1", "2"] });
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
    const { username, email, password } = await request.json();
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

    const user = new User({ username, email, password: hashedPassword });
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
