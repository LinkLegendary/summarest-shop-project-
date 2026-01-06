"use client";

import { useAuth } from "@/context/AuthContext";
import SearchPage from "../components/SearchPage";
import { Search } from "lucide-react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Book } from "@/app/lib/types";
import LibrarySkeleton from "../components/skeletons/LibrarySkeleton";

export default function LibraryPage() {
  const { library } = useAuth();
  const router = useRouter();

  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;

      if (rating >= starValue) return <span key={i}>★</span>;
      if (rating >= starValue - 0.5) return <span key={i}>☆</span>;
      return <span key={i}>✩</span>;
    });
  };

  // 🔄 Loading state
  //  if (!library) { return <LibrarySkeleton />; }

  // 🔄 REAL LOADING STATE
  // // If library is undefined or null → still loading
  if (library === null) {
    return <LibrarySkeleton />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16">
      <SearchPage icon={<Search size={20} className="text-gray-600" />} />

      {/* Saved Books */}
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-gray-900">Saved Books</h1>

        <p className="text-sm text-gray-500">{library.length} items</p>

        <div className="w-full flex justify-center ">
          <div className="bg-[#f3f8f6] rounded-xl px-6  text-center w-full ">
            {library.length === 0 ? (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">
                  Save your favorite books!
                </h2>
                <p className="text-gray-600 text-sm py-6 -mt-3">
                  When you save a book, it will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full py-3">
                {library.map((book: Book) => (
                  <div
                    key={book.id}
                    onClick={() => router.push(`/book/${book.id}`)}
                    className="cursor-pointer flex flex-col items-center text-center"
                  >
                    {book.imageLink && (
                      <div className="relative w-[120px] h-[180px] shrink-0">
                        <Image
                          src={book.imageLink}
                          alt={book.title}
                          fill
                          className="object-cover rounded-md"
                          sizes="120px"
                          loading="eager" // ✅ add this
                          priority
                        />
                      </div>
                    )}

                    <h3 className="mt-2 text-sm font-semibold leading-tight px-2">
                      {book.title}
                    </h3>

                    <p className="text-xs text-gray-500">{book.author}</p>

                    <div className="flex gap-1 text-yellow-500 text-xs mt-1">
                      {renderStars(book.averageRating)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Finished */}
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold text-gray-900">Finished</h1>

        <p className="text-sm text-gray-500">0 items</p>

        <div className="w-full flex justify-center">
          <div className="bg-[#f3f8f6] rounded-xl px-6  text-center w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 mt-6">
              Done and dusted!
            </h2>
            <p className="text-gray-600 text-sm py-6 -mt-3">
              When you finish a book, you can find it here later.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
