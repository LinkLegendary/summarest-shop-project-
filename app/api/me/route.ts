// app/api/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
// import { adminAuth } from "firebase-admin";
import { adminAuth } from "../../lib/firebase-admin"; // admin SDK


export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");
  const decoded = await adminAuth.verifyIdToken(token);

  const user = await prisma.user.findUnique({
    where: { firebaseUid: decoded.uid },
  });

  return NextResponse.json(user);
}