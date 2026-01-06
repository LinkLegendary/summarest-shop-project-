// app/api/library/toggle/route.ts


import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { adminAuth } from "@/app/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json({ error: "No auth token" }, { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = await adminAuth.verifyIdToken(token);
    if (!decoded.uid) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = await req.json();
    const book = body.book;
    if (!book?.id) return NextResponse.json({ error: "No book provided" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

    // Ensure book exists
    let dbBook = await prisma.book.findUnique({ where: { id: book.id } });
    if (!dbBook) {
      dbBook = await prisma.book.create({
        data: {
          id: book.id,
          title: book.title,
          author: book.author,
          imageLink: book.imageLink,
        },
      });
    }

    const existing = await prisma.library.findUnique({
      where: { userId_bookId: { userId: user.id, bookId: dbBook.id } },
    });

    if (existing) {
      await prisma.library.delete({
        where: { userId_bookId: { userId: user.id, bookId: dbBook.id } },
      });
    } else {
      await prisma.library.create({ data: { userId: user.id, bookId: dbBook.id } });
    }

    // ✅ Always return JSON
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("POST /api/library/toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle book" }, { status: 500 });
  }
}
















// import { NextResponse } from "next/server";
// import { db } from "@/app/lib/prisma";
// import { adminAuth } from "@/app/lib/firebase-admin";

// export async function POST(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) return NextResponse.json({ error: "No auth token" }, { status: 401 });

//     const token = authHeader.replace("Bearer ", "");
//     const decoded = await adminAuth.verifyIdToken(token);
//     if (!decoded.uid) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

//     // Parse book from request
//     const body = await req.json();
//     const book = body.book;
//     if (!book || !book.id) return NextResponse.json({ error: "No book provided" }, { status: 400 });

//     // Find user in DB
//     const user = await db.user.findUnique({ where: { firebaseUid: decoded.uid } });
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

//     // Check if book exists in DB, create if not
//     let dbBook = await db.book.findUnique({ where: { id: book.id } });
//     if (!dbBook) {
//       dbBook = await db.book.create({
//         data: {
//           id: book.id,
//           title: book.title,
//           author: book.author,
//           imageLink: book.imageLink,
//         },
//       });
//     }

//     // Check if book is already in user's library
//     const existing = await db.library.findUnique({
//       where: {
//         userId_bookId: {
//           userId: user.id,
//           bookId: dbBook.id,
//         },
//       },
//     });

//     if (existing) {
//       // Remove book
//       await db.library.delete({
//         where: {
//           userId_bookId: {
//             userId: user.id,
//             bookId: dbBook.id,
//           },
//         },
//       });
//     } else {
//       // Add book
//       await db.library.create({
//         data: {
//           userId: user.id,
//           bookId: dbBook.id,
//         },
//       });
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error: unknown) {
//     console.error("POST /api/library/toggle error:", error);
//     return NextResponse.json({ error: "Failed to toggle book" }, { status: 500 });
//   }
// }

















