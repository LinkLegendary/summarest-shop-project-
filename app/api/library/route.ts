// app/api/library/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "../../lib/prisma";
// import { adminAuth } from "../../lib/firebase-admin";
// import { Book } from "../../lib/types";

// // Type returned by Prisma for library rows
// type LibraryRowFromDB = {
//   id: string;
//   userId: string;
//   bookId: string;
//   book: {
//     id: string;
//     title: string;
//     author: string;
//     subTitle?: string;
//     imageLink?: string;
//     averageRating?: number;
//     totalRating?: number;
//     subscriptionRequired?: boolean;
//     tags?: string[];
//     bookDescription?: string;
//     authorDescription?: string;
//     audioLink?: string;
//     summary?: string;
//   };
// };

// export async function GET(req: Request) {
//   try {
//     // 1️⃣ Check Authorization header
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) return NextResponse.json([], { status: 401 });

//     const token = authHeader.replace("Bearer ", "");
//     const decoded = await adminAuth.verifyIdToken(token);
//     if (!decoded.uid) return NextResponse.json([], { status: 401 });

//     // 2️⃣ Find user in DB
//     const user = await prisma.user.findUnique({
//       where: { firebaseUid: decoded.uid },
//     });
//     if (!user) return NextResponse.json([], { status: 200 });

//     // 3️⃣ Fetch library rows with related books
//     const libraryRows: LibraryRowFromDB[] = await prisma.library.findMany({
//       where: { userId: user.id },
//       include: {
//         book: {
//           select: {
//             id: true,
//             title: true,
//             author: true,
//             subTitle: true,
//             imageLink: true,
//             averageRating: true,
//             totalRating: true,
//             subscriptionRequired: true,
//             tags: true,
//             bookDescription: true,
//             authorDescription: true,
//             audioLink: true,
//             summary: true,
//           },
//         },
//       },
//     });

//     // 4️⃣ Map to full Book[]
//     const books: Book[] = libraryRows.map((row) => ({
//       id: row.book.id,
//       title: row.book.title,
//       author: row.book.author,
//       subTitle: row.book.subTitle ?? "",
//       imageLink: row.book.imageLink ?? "",
//       averageRating: row.book.averageRating ?? 0,
//       totalRating: row.book.totalRating ?? 0,
//       subscriptionRequired: row.book.subscriptionRequired ?? false,
//       tags: row.book.tags ?? [],
//       bookDescription: row.book.bookDescription ?? "",
//       authorDescription: row.book.authorDescription ?? "",
//       audioLink: row.book.audioLink ?? "",
//       summary: row.book.summary ?? "",
//     }));

//     return NextResponse.json(books);
//   } catch (error: unknown) {
//     console.error("GET /api/library error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }














// app/api/library/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { adminAuth } from "../../lib/firebase-admin";
import { Book } from "../../lib/types";

// Type of each library row returned by Prisma
type LibraryRowFromDB = {
  id: string;
  userId: string;
  bookId: string;
  book: {
    id: string;
    title: string;
    author: string;
    imageLink?: string;
  };
};

export async function GET(req: Request) {
  try {
    // 1️⃣ Check Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) return NextResponse.json([], { status: 401 });

    const token = authHeader.replace("Bearer ", "");
    const decoded = await adminAuth.verifyIdToken(token);
    if (!decoded.uid) return NextResponse.json([], { status: 401 });

    // 2️⃣ Find the user in DB
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
    });
    if (!user) return NextResponse.json([], { status: 200 });

    // 3️⃣ Fetch library rows with related books
    const libraryRows: LibraryRowFromDB[] = await prisma.library.findMany({
      where: { userId: user.id },
      include: { book: true },
    });

    // 4️⃣ Map to full Book[] type
    const books: Book[] = libraryRows.map((row) => ({
      id: row.book.id,
      title: row.book.title,
      author: row.book.author,
      subTitle: "", // default
      imageLink: row.book.imageLink ?? "",
      averageRating: 0,
      totalRating: 0,
      subscriptionRequired: false,
      tags: [],
      bookDescription: "",
      authorDescription: "",
      audioLink: "",
      summary: "",
    }));

    return NextResponse.json(books);
  } catch (error: unknown) {
    console.error("GET /api/library error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
















// app/api/library/route.ts
// import { NextResponse } from "next/server";
// // import { prisma } from "../../lib/prisma";
// import { adminAuth } from "../../lib/firebase-admin";
// import {prisma} from "../../lib/prisma"
// import { Book } from "../../lib/types"; // adjust the path if needed



// type LibraryRowFromDB = {
//   id: string;
//   userId: string;
//   bookId: string;
//   book: {
//     id: string;
//     title: string;
//     author: string;
//     imageLink?: string;
//   };
// };






// export async function GET(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) return NextResponse.json([], { status: 401 });

//     const token = authHeader.replace("Bearer ", "");
//     const decoded = await adminAuth.verifyIdToken(token);
//     if (!decoded.uid) return NextResponse.json([], { status: 401 });

//     // Find user in DB
//     const user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
//     if (!user) return NextResponse.json([], { status: 200 });

//     // Fetch library rows with related books
//     const libraryRows:LibraryRowFromDB[] = await prisma.library.findMany({
//       where: { userId: user.id },
//       include: { book: true }, // Include book info
//     });

//     // Map to Book[]
//     // const books = libraryRows.map((row) => row.book);
//    const books: Book[] = libraryRows.map((row) => ({
//   id: row.book.id,
//   title: row.book.title,
//   author: row.book.author,
//   subTitle: "", // default empty string
//   imageLink: row.book.imageLink ?? "",
//   averageRating:  0,// default
//   totalRating:  0,
//   subscriptionRequired:  false,
//   tags: [],
//   bookDescription: "",
//   authorDescription: "",
//   audioLink: "",
//   summary: "",
// }));


//     return NextResponse.json(books);
//   } catch (error: unknown) {
//     console.error("GET /api/library error:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }












// import { NextResponse } from "next/server";
// import { db } from "@/app/lib/prisma";
// import { adminAuth } from "@/app/lib/firebase-admin";

// export async function GET(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.replace("Bearer ", "");

//     if (!token) return NextResponse.json([]);

//     const decoded = await adminAuth.verifyIdToken(token);

// const user = await db.user.findUnique({
//   where: { firebaseUid: decoded.uid },
// });

// if (!user) {
//   return NextResponse.json([]);
// }






    // const user = await db.user.upsert({
    //   where: { firebaseUid: decoded.uid },
    //   update: {},
    //   create: {
    //     firebaseUid: decoded.uid,
    //     email: decoded.email,
    //   },
    // });

//     const library = await db.library.findMany({
//       where: { userId: user.id },
//       include: { book: true },
//     });

//     return NextResponse.json(library.map((l) => l.book));
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json([], { status: 500 });
//   }
// }





// import { NextResponse } from "next/server";
// import { db } from "@/app/lib/prisma";
// import { adminAuth } from "@/app/lib/firebase-admin";

// export async function GET(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.replace("Bearer ", "");

//     if (!token) return NextResponse.json([]);

//     const decoded = await adminAuth.verifyIdToken(token);

//     const user = await db.user.upsert({
//       where: { firebaseUid: decoded.uid },
//       update: {},
//       create: {
//         firebaseUid: decoded.uid,
//         email: decoded.email,
//       },
//     });

//     const library = await db.library.findMany({
//       where: { userId: user.id },
//       include: { book: true },
//     });

//     return NextResponse.json(library.map((l) => l.book));
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json([], { status: 500 });
//   }
// }