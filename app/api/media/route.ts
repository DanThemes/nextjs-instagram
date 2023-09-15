import Media from "@/models/Media";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

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

  // create media
  try {
    const { type, url } = await request.json();
    if (!type || !url) {
      return NextResponse.json(
        { message: "Please fill in all the required fields" },
        { status: 400 }
      );
    }

    const media = new Media({ type, url });
    await media.save();

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.log("Required fields are missing for media creation:", error);
    return NextResponse.json(
      { message: "Required fields are missing for media creation" },
      { status: 400 }
    );
  }
}
