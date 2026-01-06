"use client";

import { useAuth } from "@/context/AuthContext";
import AudioPlayer from "../components/AudioPlayer";
import { Book } from "@/app/lib/types";

const PlayerClient = ({ book }: { book: Book }) => {
  const { fontSize } = useAuth();

  return (
    <div className="max-w-5xl mx-auto p-6 w-full mt-20">
      {/* Title */}
      <h1 className="text-3xl font-bold">
        {book.title}
        {book.subscriptionRequired && " (Premium)"}
      </h1>

      {/* Subtitle */}
      <p
        className="mt-2"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.7,
        }}
      >
        {book.subTitle}
      </p>

      <p
        className="mt-16"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1.7,
        }}
      >
        {book.summary}
      </p>

      {/* Audio Player */}
      {book.audioLink && (
        <div className="mt-8">
          <AudioPlayer
            audioSrc={book.audioLink}
            summary={book.summary}
            book={book}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerClient;
