import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Media from "@/models/Media";

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
    const media = await Media.findOne({ _id: params.id });

    if (media) {
      return NextResponse.json({ media }, { status: 200 });
    }
    throw new Error("Invalid or missing media parameters");
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or missing media parameters" },
      { status: 400 }
    );
  }
}
