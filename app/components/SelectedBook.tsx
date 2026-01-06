"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState, useEffect } from "react";
// import { Book } from "@/app/lib/types"; // ✅ shared type
import { Book } from "../lib/types";

type SelectedBookProps = {
  book: Book;
};

export default function SelectedBook({ book }: SelectedBookProps) {
  const [duration, setDuration] = useState<string>("");

  useEffect(() => {
    if (!book.audioLink) return;

    const audio = new Audio(book.audioLink);

    const handleLoaded = () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      setDuration(
        `${minutes} mins ${seconds.toString().padStart(2, "0")} secs`
      );
    };

    audio.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [book.audioLink]);

  return (
    <div className="flex items-center gap-8 bg-[#f7f1df] rounded-xl p-6 w-full flex-col sm:flex-row">
      {/* Text */}
      <div className="flex-1">
        {book.subTitle && (
          <h2 className="text-lg font-semibold mb-2">{book.subTitle}</h2>
        )}

        <h3 className="text-2xl font-bold">{book.title}</h3>
        <p className="text-gray-600 mt-1">{book.author}</p>
      </div>

      <div className="flex flex-col justify-center item-center sm:flex-row ">
        <div>
          {/* Image */}
          {book.imageLink && (
            <div className="relative w-[120px] h-[180px] shrink-0">
              <Image
                src={book.imageLink}
                alt={book.title}
                fill
                sizes="120px"
                className="object-cover rounded-md"
                loading="eager" // ✅ add this
                priority // optional, also improves LCP
              />
            </div>
          )}
        </div>

        {/* Play */}
        <div className="flex items-center gap-2 mt-3 ml-1 flex-col sm:flex-row">
          <div className="bg-black text-white p-3 rounded-full">
            <Play size={18} />
          </div>
          <span className="text-sm text-gray-600">{duration || "Loading"}</span>
        </div>
      </div>
    </div>
  );
}
