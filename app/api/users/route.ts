import User from "@/models/User";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: ["1", "2"] });
}

export async function POST(request: NextRequest) {
  // const user = await request.json();
  await dbConnect();

  const user = await User.create({ name: "Dani", email: "dani@test.ro" });

  return NextResponse.json(user, { status: 201 });
}
