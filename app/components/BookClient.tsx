
"use client";

import Image from "next/image";
import { Book } from "@/app/lib/types";
import { BookOpen, Headphones, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";



interface BookClientProps {
  book: Book;
  
}

export const BookClient = ({ book }: BookClientProps) => {
  const router = useRouter();
  const {library, toggleBook, authReady} = useAuth();

if (!authReady || library === null) {
    return <div className="p-4 text-gray-500">Loading library...</div>;
  }



const isInLibrary = library.some((b) => b.id === book.id);
// const isInLibrary = library?.some((b) => b.id === book.id) ?? false;

  const isLoggedIn = true;
  const isSubscribed = false;

  const openAuthModal = () => {
    alert("open auth modal");
  };

  const handleReadOrListen = () => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }

    if (book.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${book.id}`);
  };

  const handleAddOrRemoveLibrary = () => {
    if (!isLoggedIn) {
    openAuthModal();
    return;
  }

  toggleBook(book);

    console.log("Saving book to library:", book);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Book Image */}
        {book.imageLink && (
          <div className="relative w-full sm:w-64 md:w-72 h-80 mx-auto sm:mx-0">
            <Image
              src={book.imageLink}
              alt={book.title}
              fill
              // priority
              className="object-contain rounded-md"
              sizes="(max-width: 640px) 100vw, 300px"
            />
          </div>
        )}

        {/* Book Info */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {book.title}
            {book.subscriptionRequired && (
              <span className="text-sm text-blue-600 ml-2">(Premium)</span>
            )}
          </h1>

          <p className="text-gray-600 mt-1">{book.author}</p>
          <p className="mt-2 text-sm sm:text-base">{book.subTitle}</p>

          <p className="mt-2 text-sm">
            ⭐ {book.averageRating?.toFixed(1)} ({book.totalRating} ratings)
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleReadOrListen}
                className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <div className="flex items-center gap-2 bg-blue-500 px-1 rounded text-white">
                   <BookOpen size={18} />
                Read
                </div>
               
              </button>

              <button
                onClick={handleReadOrListen}
                className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <div>
                  <div className="flex items-center gap-2 bg-blue-500 px-1 rounded text-white">
                   <Headphones size={18} />
                Listen
                </div>
                </div>
                
              </button>
            </div>

            <button
              onClick={handleAddOrRemoveLibrary}
              // className="btn-outline flex items-center justify-center gap-2 w-full sm:w-fit"
              className={`btn-outline flex items-center justify-center gap-2 w-full sm:w-fit
           ${isInLibrary ? "bg-green-500 text-white px-1 rounded" : ""}`}
            >
              <Bookmark size={18} />
             {isInLibrary ? "Saved In Library" : "Add to My Library"}
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {book.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">What’s it about?</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          {book.bookDescription}
        </p>
      </div>

      {/* Author */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">About the author</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">
          {book.authorDescription}
        </p>
      </div>
    </div>
  );
};

export default BookClient;





























// "use client";

// import Image from "next/image";
// // import { Book } from "../lib/types"
// import { Book } from "@/app/lib/types";
// import { BookOpen, Headphones, Bookmark } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface BookClientProps {
//   book: Book;
// }

// export const BookClient = ({ book }: BookClientProps) => {
//   const router = useRouter();

//   const isLoggedIn = true;
//   const isSubscribed = false;

//   const openAuthModal = () => {
//     alert("open auth modal");
//   };

//   const handleReadOrListen = () => {
//     if (!isLoggedIn) {
//       openAuthModal();
//       return;
//     }

//     if (book.subscriptionRequired && !isSubscribed) {
//       router.push("http://localhost:3000/choose-plan");
//       return;
//     }

//     router.push(`http://localhost:3000/player/${book.id}`);
//   };

//   const handleAddToLibrary = () => {
//     if (!isLoggedIn) {
//       openAuthModal();
//       return;
//     }

//     console.log("Saving book to library:", book);
//     // Save book to DB later
//   };

//   return (
//     <div
//       className="max-w-5xl mx-auto p-56 "
//       style={{
//         padding: "140px",
//         paddingLeft: "160px",
//         paddingTop: "30px",
//         marginLeft: "180px",
//       }}
//     >
//       {/* Title */}
//       <h1 className="text-3xl font-bold">
//         {book.title}
//         {book.subscriptionRequired && " (Premium)"}
//       </h1>

//       {/* Author */}
//       <p className="text-gray-600 mt-1">{book.author}</p>

//       {/* Subtitle */}
//       <p className="mt-2">{book.subTitle}</p>

//       {/* Rating */}
//       <p className="mt-2 text-sm">
//         ⭐ {book.averageRating?.toFixed(1)} ({book.totalRating} ratings)
//       </p>

//       {/* Image */}
//       {book.imageLink && (
//         <div className="my-6 relative w-75 h-100">
//           <Image
//             src={book.imageLink}
//             alt={book.title}
//             fill
//             priority
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
//             style={{ objectFit: "contain" }}
//           />
//         </div>
//       )}

//       {/* Buttons */}
//       <div
//         className="flex flex-col gap-4 my-4 mb-14"
//         style={{ marginBottom: "14px" }}
//       >
//         <div className="flex ">
//           <button
//             onClick={handleReadOrListen}
//             className="flex btn-primary mr-12 "
//           >
//             <div className="bg-blue-700 flex p-2 ">
//               <div className="mr-2 flex items-center text-white">
//                 <BookOpen size={18} />
//               </div>

//               <h1 className="text-white">Read</h1>
//             </div>
//           </button>
//           <button onClick={handleReadOrListen} className="flex btn-secondary">
//             <div className="flex bg-blue-700 p-2">
//               <div className="flex items-center mr-2 text-white">
//                 <Headphones size={18} />
//               </div>

//               <h1 className="flex items-center text-white"> Listen</h1>
//             </div>
//           </button>
//         </div>

//         <button
//           onClick={handleAddToLibrary}
//           className="btn-outline flex items-center"
//         >
//           <div className="flex bg-blue-700 p-2">
//             <div className="flex items-center mr-2 text-white">
//               <Bookmark size={18} />
//             </div>

//             <h1 className="text-white"> Add to My Library</h1>
//           </div>
//         </button>
//       </div>

//       <div className="flex gap-2 my-4">
//         {book.tags?.map((tag: string) => (
//           <span
//             key={tag}
//             className="px-3 py-1 bg-gray-200 rounded-full text-sm"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       {/* Description */}
//       <h2 className="text-xl font-semibold mt-6">What’s it about?</h2>
//       <p className="mt-2">{book.bookDescription}</p>

//       {/* Author */}
//       <h2 className="text-xl font-semibold mt-6">About the author</h2>
//       <p className="mt-2">{book.authorDescription}</p>
//     </div>
//   );
// };

// export default BookClient;
