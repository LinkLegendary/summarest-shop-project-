
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBooks {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

export default function SearchPage({ icon }: { icon?: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<SearchBooks[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setBooks([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await res.json();
        setBooks(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchQuery("");
        setBooks([]);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (id: string) => {
    setSearchQuery("");
    setBooks([]);
    setIsOpen(false);
    router.push(`/book/${id}`);
  };

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative max-w-md mx-auto"
      >
        {icon && (
          <div className="absolute left-3 top-15 -translate-y-1/2 text-gray-400 z-50">
            {icon}
          </div>
        )}

        <input
          type="text"
          placeholder="Search books..."
          className="
            relative
            w-full
            pl-10
            pr-3
            py-2
           bg-[#f3f8f6]  
            border
            border-gray-300
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            mt-10
            
          "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isOpen && (
          <ul
            className="
              absolute
              top-full
              left-0
              mt-3
              w-full
              bg-white
              border
              border-gray-200
              rounded-md
              shadow-lg
              max-h-96
              overflow-y-auto
              z-50
            "
          >
            {isLoading && (
              <li className="p-3 text-center text-gray-500">Loading...</li>
            )}

            {!isLoading && books.length === 0 && (
              <li className="p-3 text-center text-gray-500">No books found</li>
            )}

            {books.map((book) => (
              <li
                key={book.id}
                onClick={() => handleSelect(book.id)}
                className="p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {book.imageLink && (
                    <Image
                      src={book.imageLink}
                      alt={book.title}
                      width={64}
                      height={80}
                      className="rounded object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}














// "use client";

// import { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// interface SearchBooks {
//   id: string;
//   title: string;
//   author: string;
//   imageLink: string;
// }

// export default function SearchPage({ icon }: { icon?: React.ReactNode }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [books, setBooks] = useState<SearchBooks[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsopen] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     //You must guard against empty search before starting the timeout.
//     if (!searchQuery.trim()) {
//       setBooks([]);
//       setIsopen(false);
//       setIsLoading(false);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
//             searchQuery
//           )}`
//         );
//         const data = await res.json();
//         console.log("check:", data);
//         setBooks(data);
//         setIsopen(true);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 500);

//     return () => clearTimeout(timeout);
//   }, [searchQuery]);

//   console.log("Rendered SearchPage with books:", containerRef.current);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setSearchQuery("");
//         setBooks([]);
//         setIsopen(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   const handleSelect = (bookd: string) => {
//     setSearchQuery("");
//     setBooks([]);
//     router.push(`/book/${bookd}`); // adjust route if needed
//   };

//   return (
//     <div className="bg-gray-50 fixed top-0 left-0 right-0 p-4 pt-4 z-[1000] ">
//       <div
//         ref={containerRef}
//         className="relative flex items-center max-w-md mx-auto ml-200"
//       >
//         {icon && <div className="absolute left-3">{icon}</div>}
//         <input
//           type="text"
//           placeholder="Search books..."
//           className="w-full pl-10 bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           onChange={(e) => setSearchQuery(e.target.value)}
//           value={searchQuery}
//         />
//       </div>

//       <div className="">
//         {isOpen && (
//           <ul
//             className="
//           absolute
//           left-[1300px] 
//             -translate-x-1/2
//             mt-1
//             w-full max-w-md
//             bg-white
//             border border-gray-300
//             rounded-md
//             shadow-lg
//             divide-y divide-gray-200
//             z-[1100]
//             scroll-m-180
//             max-h-96
//             overflow-y-auto
//                 "
//           >
//             {isLoading && (
//               <li className="p-3 text-center text-gray-500">Loading...</li>
//             )}

//             {!isLoading && books.length === 0 && (
//               <li className="p-3 text-center text-gray-500">No books found</li>
//             )}

//             {books.map((book) => (
//               <li
//                 onClick={() => handleSelect(book.id)}
//                 key={book.id}
//                 className="
//              p-3 hover:bg-gray-100 transition cursor-pointer
//              "
//               >
//                 <div className="flex items-center">
//                   {book.imageLink && (
//                     <Image
//                       src={book.imageLink}
//                       alt={book.title}
//                       className="w-16 h-16 object-cover rounded-md"
//                       width={160}
//                       height={180}
//                       priority
//                     />
//                   )}

//                   <div className="ml-4">
//                     <h3 className="font-semibold">{book.title}</h3>
//                     <p className="text-sm text-gray-600">{book.author}</p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
