import { NextResponse } from "next/server";
// import {  } from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/firebase-admin";
import {prisma} from "../../lib/prisma"

// POST /api/user
export async function POST(req: Request) {
  try {
    // 1️⃣ Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "No auth token" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");

    // 2️⃣ Verify Firebase token
    const decoded = await adminAuth.verifyIdToken(token);
    if (!decoded.uid) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    // 3️⃣ Upsert user in your DB
    const user = await prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {
        email: decoded.email,
      },
      create: {
        firebaseUid: decoded.uid,
        email: decoded.email || "",
      },
    });

    return NextResponse.json({ ok: true, user });
  } catch (error: unknown) {
    console.error("Error in /api/user:", error);
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}