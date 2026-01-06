import BookClient from "@/app/components/BookClient";
import { getBookById } from "@/app/lib/api";
import { Book } from "@/app/lib/types";

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const book: Book = await getBookById(id);

  // console.log("check:", book);

  return (
    <div>
      <BookClient book={book} />
    </div>
  );
}
