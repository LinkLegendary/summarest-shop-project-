import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // your Prisma client
import {prisma} from "../../lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "No userId provided" }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { subscription: "premium" }, // set premium
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 });
  }
}