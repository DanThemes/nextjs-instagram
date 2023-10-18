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

  try {
    const usernameTerm = request.nextUrl.searchParams.get("username");
    if (!usernameTerm) {
      return NextResponse.json(
        { message: "Mising search parameter" },
        { status: 400 }
      );
    }
    const users = await User.find({
      username: { $regex: usernameTerm, $options: "i" },
    }).select("-password");

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving the search results", error);
    return NextResponse.json(
      { message: "Error while retrieving the search results" },
      { status: 400 }
    );
  }
}
