import AudioPlayer from "@/app/components/AudioPlayer";
import { getBookById } from "@/app/lib/api";
import { useAuth } from "@/context/AuthContext";
import PlayerClient from "../PlayerClient";




export default async function PlayerPage({
  params,
}: {
  params: { id: number };
}) {


const { id } = await params;
  const book = await getBookById(id);
  

  return (
    <div>
      <PlayerClient book={book}/>
    </div>
    
  );
}







// import AudioPlayer from "@/app/components/AudioPlayer";
// import { getBookById } from "@/app/lib/api";
// import Image from "next/image";

// export default async function PlayerPage({
//   params,
// }: {
//   params: { id: number };
// }) {
//   const { id } = await params;
//   const book = await getBookById(id);

//   return (
//     <div className="max-w-5xl mx-auto p-6 ml-20 pl-32"
//       style={{padding: "220px", marginLeft: "100px", marginTop: "30px", paddingTop: "30px"}}
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
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
//             style={{ objectFit: "contain" }}
//           />
//         </div>
//       )}

//       {/* Description */}
//       <h2 className="text-xl font-semibold mt-6">{book.title}</h2>
//       <p className="mt-2">{book.summary}</p>

//       {/* Audio Player */}
//       {book.audioLink && (
//         <div className="mt-8">
//           <AudioPlayer
//           audioSrc={book.audioLink}
//           summary={book.summary}
//           book={book}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
