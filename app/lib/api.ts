
import { Book } from "@/app/lib/types"

export async function getBooksByStatus(status : string):Promise<Book[]> {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export async function getBookById(id: string | number) {
  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

