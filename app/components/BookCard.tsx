"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import { Book } from "../lib/types";
import { Book } from "@/app/lib/types";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter();

  const renderStars = () => {
    const rating = book.averageRating || 0;

    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;

      if (rating >= starValue) return <span key={i}>★</span>;
      if (rating >= starValue - 0.5) return <span key={i}>☆</span>;
      return <span key={i}>✩</span>;
    });
  };

  return (
    <div
      onClick={() => router.push(`/book/${book.id}`)}
      className="w-45 shrink-0 cursor-pointer"
    >
      <div className="relative">
        {book.subscriptionRequired && (
          <span className="absolute -top-5 left-16 bg-[#1c1c1c] text-white text-[10px] px-2 py-0.5 rounded-full z-10">
            Premium
          </span>
        )}

        {book.imageLink && (
          <div className="relative w-[120px] h-[180px] shrink-0">
            <Image
              src={book.imageLink}
              alt={book.title}
              fill
              sizes="120px"
              className="object-cover rounded-md"
              loading="eager" // ✅ add this
              // priority // optional, also improves LCP
            />
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="text-sm font-semibold leading-tight">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>
        <div className="flex gap-1 text-yellow-500 text-xs">
          {renderStars()}
        </div>
      </div>
    </div>
  );
}
