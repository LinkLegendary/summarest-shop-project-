"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import BookCard from "../components/BookCard";
import SelectedBook from "../components/SelectedBook";
import { getBooksByStatus } from "@/app/lib/api";
import { Book } from "@/app/lib/types";
import { Search } from "lucide-react";
import SearchPage from "../components/SearchPage";
import AuthSkeleton from "../components/skeletons/AuthSkeleton";
import BooksSkeleton from "../components/skeletons/BooksSkeleton";





export default function ForYouPage() {
  const { user, authReady } = useAuth();
  const router = useRouter();

  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [suggested, setSuggested] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (authReady && !user) {
      router.replace("/");
    }
  }, [authReady, user, router]);

  // 📚 Fetch books
  useEffect(() => {
    if (!authReady || !user) return;

    const fetchBooks = async () => {
      try {
        const [selected, rec, sugg] = await Promise.all([
          getBooksByStatus("selected"),
          getBooksByStatus("recommended"),
          getBooksByStatus("suggested"),
        ]);

        setSelectedBooks(selected);
        setRecommended(rec);
        setSuggested(sugg);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [authReady, user]);

  

if (!authReady || !user) {
  return <AuthSkeleton />;
}

if (loading) {
  return <BooksSkeleton />;
}





  const selectedBook = selectedBooks[0];

  return (
    <div
      className="
      w-full
        max-w-7xl
        mx-auto
        px-4 sm:px-6 lg:px-8
        py-6 sm:py-10 lg:py-12
        space-y-16
        overflow-x-hidden
      "
    >
      {/* 🔍 Search */}
      <div className="max-w-2xl mx-auto">
        <SearchPage icon={<Search size={20} />} />
      </div>

      {/* ⭐ Selected */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Selected just for you
        </h2>

        {selectedBook && (
          <div className="flex justify-center">
            <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
              <SelectedBook book={selectedBook} />
            </div>
          </div>
        )}
      </section>

      {/* 🔥 Recommended */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Recommended For You</h2>
          <p className="text-gray-500">We think you’ll like these.</p>
        </div>
        {/* OUTER: hides overflow */}
        <div className="relative w-full">
          {/* INNER: scroll container */}
          <div className="w-full overflow-x-auto">
            <div
              className="
              flex
              gap-10
              px-4 sm:px-6 lg:px-8
              pb-4
              pt-6
              snap-x snap-mandatory
              w-max
            "
            >
              {recommended.map((book) => (
                <div
                  key={book.id}
                  className="
                  snap-start
                  shrink-0
                  w-[160px]
                  sm:w-[200px]
                  md:w-[220px]
                  lg:w-[240px]
                "
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 📘 Suggested */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Suggested Books</h2>
          <p className="text-gray-500">Browse those books</p>
        </div>
        {/* OUTER: hides overflow */}
        <div className="relative w-full">
          {/* INNER: scroll container */}
          <div className="w-full overflow-x-auto">
            <div
              className="
             flex
        gap-4
        px-4 sm:px-6 lg:px-8
        pb-4
        pt-6
        snap-x snap-mandatory
        w-max
            "
            >
              {suggested.map((book) => (
                <div
                  key={book.id}
                  className="
                  snap-start
                  shrink-0
                  w-[160px]
                  sm:w-[200px]
                  md:w-[220px]
                  lg:w-[240px]
                "
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import BookCard from "../components/BookCard";
// import SelectedBook from "../components/SelectedBook";
// import { getBooksByStatus } from "@/app/lib/api";
// import { Book } from "@/app/lib/types";
// import { Search } from "lucide-react";
// import SearchPage from "../components/SearchPage";

// export default function ForYouPage() {
//   const { user, authReady } = useAuth();
//   const router = useRouter();

//   const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
//   const [recommended, setRecommended] = useState<Book[]>([]);
//   const [suggested, setSuggested] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔐 Redirect if not logged in
//   useEffect(() => {
//     if (authReady && !user) {
//       router.replace("/");
//     }
//   }, [authReady, user, router]);

//   // 📚 Fetch books
//   useEffect(() => {
//     if (!authReady || !user) return;

//     const fetchBooks = async () => {
//       try {
//         const [selected, rec, sugg] = await Promise.all([
//           getBooksByStatus("selected"),
//           getBooksByStatus("recommended"),
//           getBooksByStatus("suggested"),
//         ]);

//         setSelectedBooks(selected);
//         setRecommended(rec);
//         setSuggested(sugg);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, [authReady, user]);

//   if (!authReady || !user) return <p className="p-6">Loading...</p>;
//   if (loading) return <p className="p-6">Loading books...</p>;

//   const selectedBook = selectedBooks[0];

//   return (
//     <div
//       className="
//         max-w-7xl
//         mx-auto
//         px-4 sm:px-6 lg:px-8
//         py-6 sm:py-10 lg:py-12
//         space-y-16
//       "
//     >
//       {/* 🔍 Search */}
//       <div className="max-w-2xl mx-auto">
//         <SearchPage icon={<Search size={20} />} />
//       </div>

//       {/* ⭐ Selected */}
//       <section className="space-y-6">
//         <h2 className="text-2xl font-bold text-center">
//           Selected just for you
//         </h2>

//         {selectedBook && (
//           <div className="flex justify-center">
//             <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
//               <SelectedBook book={selectedBook} />
//             </div>
//           </div>
//         )}
//       </section>

//       {/* 🔥 Recommended */}
//       <section className="space-y-8">
//         <div className="text-center space-y-2">
//           <h2 className="text-2xl font-bold">Recommended For You</h2>
//           <p className="text-gray-500">We think you’ll like these.</p>
//         </div>

//         <div className="overflow-x-auto">
//           <div
//             className="
//               flex
//               gap-3 sm:gap-4
//               pb-4
//               snap-x snap-mandatory
//             "
//           >
//             {recommended.map((book) => (
//               <div
//                 key={book.id}
//                 className="
//                   snap-start
//                   shrink-0
//                   w-[160px]
//                   sm:w-[200px]
//                   md:w-[220px]
//                   lg:w-[240px]
//                 "
//               >
//                 <BookCard book={book} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 📘 Suggested */}
//       <section className="space-y-8">
//         <div className="text-center space-y-2">
//           <h2 className="text-2xl font-bold">Suggested Books</h2>
//           <p className="text-gray-500">Browse those books</p>
//         </div>

//         <div className="overflow-x-auto">
//           <div
//             className="
//               flex
//               gap-3 sm:gap-4
//               pb-4
//               snap-x snap-mandatory
//             "
//           >
//             {suggested.map((book) => (
//               <div
//                 key={book.id}
//                 className="
//                   snap-start
//                   shrink-0
//                   w-[160px]
//                   sm:w-[200px]
//                   md:w-[220px]
//                   lg:w-[240px]
//                 "
//               >
//                 <BookCard book={book} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

