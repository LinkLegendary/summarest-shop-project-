"use client";

import { useEffect, useRef, useState } from "react";
import { Book } from "@/app/lib/types";
import Image from "next/image";
import { DbNullClass } from "@prisma/client/runtime/client";

interface AudioPlayerProps {
  audioSrc: string;
  summary?: string;
  book: Book;
}

export default function AudioPlayer({ audioSrc, book }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [src, setSrc] = useState<string | null>(null);
  


  useEffect(() => {
    setSrc(`${audioSrc}?t=${Date.now()}`);
  }, [audioSrc]);

  // ✅ Guard AFTER hooks

  if (!src) return null;
 
  const togglePlay = () => {
    const audio = audioRef.current;
    
    if (!audio) return;

    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  const seek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <>
   
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 px-4 py-3 lg:left-56 lg:w-[calc(100%-14rem)]">
        <div className="flex justify-around">
          <div>
            {book.imageLink && (
              <div className="relative w-10 h-14 flex-shrink-0">
                <Image
                  src={book.imageLink}
                  alt={book.title}
                  fill
                  className="object-contain rounded-md"
                  sizes="40px"
                  priority
                />
              </div>
            )}
             



          </div>

          <div className="flex justify-between items-center gap-4">
            {/* Controls */}
            <div className="flex items-center gap-4 w-full">
              <button onClick={() => (audioRef.current!.currentTime -= 10)}>
                ⏪
              </button>

              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full border px-2  items-center flex justify-center"
              >
                {playing ? "⏸" : "▶"}
              </button>

              <button onClick={() => (audioRef.current!.currentTime += 10)}>
                ⏩
              </button>

              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full h-1 accent-blue-600"
              />

              {/* Time */}
              <div className="text-xs text-gray-500 text-center flex">
                <div className="px-1">
                  {Math.floor(currentTime / 60)}:
                  {String(Math.floor(currentTime % 60)).padStart(2, "0")}
                </div>
                <div className="font-bold">{" / "}</div>
                <div className="px-1">
                  {Math.floor(duration / 60)}:
                  {String(Math.floor(duration % 60)).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Book } from "@/app/lib/types";

// import Image from "next/image";

// interface AudioPlayerProps {
//   audioSrc: string;
//   summary?: string;
//    book: Book;
// }

// export default function AudioPlayer({ audioSrc, book }: AudioPlayerProps) {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [src, setSrc] = useState<string | null>(null);

//   console.log("image:", book.imageLink);

//   useEffect(() => {

//     setSrc(`${audioSrc}?t=${Date.now()}`);
//   }, [audioSrc]);

//   if (!src || !book) return null;

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (playing) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setPlaying(!playing);
//   };

//   const seek = (value: number) => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = value;
//     setCurrentTime(value);
//   };

//   return (
//     <>
//       {src && (
//         <audio
//           ref={audioRef}
//           src={src}
//           onTimeUpdate={() =>
//             setCurrentTime(audioRef.current?.currentTime ?? 0)
//           }
//           onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
//         />
//       )}

//       {/* 🔊 Bottom Player */}
//       <div
//         className="
//           fixed bottom-0 left-0 right-0 z-1200
//           bg-gray-100
//           px-4 py-3
//           /* 👇 KEY FIX */
//           lg:left-56
//          lg:w-[calc(100%-14rem)]

//           "
//         //  14rem = w-56 sidebar
//       >
//         <div className="flex justify-between items-center">
//           <div>

//             {book?.imageLink && (
//                     <div className="relative w-5 h-5 flex-shrink-0">
//                       <Image
//                         src={book.imageLink}
//                         alt={book.title}
//                         fill
//                         className="object-contain rounded-md"
//                         sizes="40px"
//                         priority
//                       />

//                     </div>
//                   )}
//           </div>

//           <div
//             className="
//             max-w-5xl mx-auto
//             flex items-center gap-4
//             px-4 py-2
//           "
//           >
//             {/* Controls */}
//             <div
//               className="
//               flex items-center justify-center gap-4
//             "
//             >
//               <button
//                 onClick={() => (audioRef.current!.currentTime -= 10)}
//                 className="text-lg"
//               >
//                 ⏪
//               </button>

//               <button
//                 onClick={togglePlay}
//                 className="
//                 w-8 h-8
//                 flex items-center justify-center
//                 rounded-full border
//                 text-sm
//               "
//               >
//                 {playing ? "⏸" : "▶"}
//               </button>

//               <button
//                 onClick={() => (audioRef.current!.currentTime += 10)}
//                 className="text-lg"
//               >
//                 ⏩
//               </button>
//             </div>

//             {/* Seek bar */}
//             <input
//               type="range"
//               min={0}
//               max={duration}
//               value={currentTime}
//               onChange={(e) => seek(Number(e.target.value))}
//               className="
//               w-full
//               h-1
//               accent-blue-600
//               cursor-pointer
//               rounded-full
//             "
//             />

//     {/* Time */}
//     <div className="text-xs text-gray-500 text-center flex">
//       <div className="px-1">
//         {Math.floor(currentTime / 60)}:
//         {String(Math.floor(currentTime % 60)).padStart(2, "0")}
//       </div>
//       <div className="font-bold">{" / "}</div>
//       <div className="px-1">
//         {Math.floor(duration / 60)}:
//         {String(Math.floor(duration % 60)).padStart(2, "0")}
//       </div>
//     </div>
//   </div>
// </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import { useEffect, useRef, useState } from "react";

// interface AudioPlayerProps {
//   audioSrc: string;
//   summary?: string;
// }

// export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [src, setSrc] = useState<string | null>(null);

//   useEffect(() => {
//     setSrc(`${audioSrc}?t=${Date.now()}`);
//   }, [audioSrc]);

//   if (!src) return null;

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (playing) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setPlaying(!playing);
//   };

//   const seek = (value: number) => {
//     if (!audioRef.current) return;
//     audioRef.current.currentTime = value;
//     setCurrentTime(value);
//   };

//   return (
//     <>
//       {src && (
//         <audio
//           ref={audioRef}
//           src={src}
//           onTimeUpdate={() =>
//             setCurrentTime(audioRef.current?.currentTime ?? 0)
//           }
//           onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
//         />
//       )}

//       {/* 🔊 Bottom Player */}
//       <div
//         className="
//           fixed bottom-0 left-0 right-0 z-1200
//           bg-gray-100
//           px-4 py-3
//           /* 👇 KEY FIX */
//           lg:left-56
//          lg:w-[calc(100%-14rem)]

//           "
//            //  14rem = w-56 sidebar
//         >

//         <div
//           className="
//             max-w-5xl mx-auto
//             flex items-center gap-4
//             px-4 py-2
//           "
//         >
//           {/* Controls */}
//           <div
//             className="
//               flex items-center justify-center gap-4
//             "
//            >
//             <button
//               onClick={() => (audioRef.current!.currentTime -= 10)}
//               className="text-lg"
//             >
//               ⏪
//             </button>

//             <button
//               onClick={togglePlay}
//               className="
//                 w-8 h-8
//                 flex items-center justify-center
//                 rounded-full border
//                 text-sm
//               "
//             >
//               {playing ? "⏸" : "▶"}
//             </button>

//             <button
//               onClick={() => (audioRef.current!.currentTime += 10)}
//               className="text-lg"
//             >
//               ⏩
//             </button>
//           </div>

//           {/* Seek bar */}
//           <input
//             type="range"
//             min={0}
//             max={duration}
//             value={currentTime}
//             onChange={(e) => seek(Number(e.target.value))}
//             className="
//               w-full
//               h-1
//               accent-blue-600
//               cursor-pointer
//               rounded-full
//             "
//           />

//           {/* Time */}
//           <div className="text-xs text-gray-500 text-center flex">
//             <div className="px-1">
//               {Math.floor(currentTime / 60)}:
//               {String(Math.floor(currentTime % 60)).padStart(2, "0")}
//             </div>
//             <div className="font-bold">{" / "}</div>
//             <div className="px-1">
//               {Math.floor(duration / 60)}:
//               {String(Math.floor(duration % 60)).padStart(2, "0")}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import styles from "../lib/AudioPlayer.module.css";

// interface AudioPlayerProps {
//   audioSrc: string;
//   summary: string;
// }

// const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [playing, setPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [src, setSrc] = useState<string | null>(null);

//   // ✅ Run only on client
//   useEffect(() => {
//     setSrc(`${audioSrc}?t=${Date.now()}`);
//   }, [audioSrc]);

//   if (!src) return null; // prevent mismatch

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (playing) {
//       audio.pause();
//     } else {
//       audio.play();
//     }

//     setPlaying(!playing);
//   };

//   return (
//     <div
//       className={`${styles}

//     w-full
//     h-20
//     px-4 py-3
//     opecity-0

//     flex flex-col gap-2
//     `}
//     >
//       <audio
//         ref={audioRef}
//         src={src}
//         onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
//         onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
//       />
//      <div
//      className="bg-gray-200
//      fixed
//      flex items-center
//      justify-center p-1 rounded-md text-black text-sm
//      mb-1 gap-4 pt-4 px-4
//      bottom-0 right-0 left-0 "

//      style={{marginBottom: "0"}}
//      >
//          <div
//         // className={`${styles.controls} flex items-center justify-center gap-4 `}
//       >
//         <button
//           className="text-[20px] p-1"
//           style={{ fontSize: "16px" }}
//           onClick={() => (audioRef.current!.currentTime -= 10)}
//         >
//           ⏪
//         </button>

//         <button
//           onClick={togglePlay}
//           style={{ fontSize: "16px", marginTop:"-4px" }}
//           className="text-base p-2 rounded-full border"
//         >
//           {playing ? "\u23F8" : "\u25B6"}
//         </button>
//         <button
//           className="text-sm p-1"
//           onClick={() => (audioRef.current!.currentTime += 10)}
//           style={{ fontSize: "16px" }}
//         >
//           ⏩
//         </button>
//       </div>

//       <input
//         // className={styles.seekBar}
//         type="range"
//         min={0}
//         max={duration}
//         value={currentTime}
//         onChange={(e) => {
//           const v = Number(e.target.value);
//           audioRef.current!.currentTime = v;
//           setCurrentTime(v);
//         }}
//         // className={`${styles.seekBar} w-full h-1 accent-gray-600 `}
//          className="
//       w-80
//        h-1
//       accent-blue-500
//        cursor-pointer
//       appearance-none
//       bg-gray-300
//       rounded-full
//   "
//       style={{marginTop: "-5px"}}
//       />

//       <div className="text-xs text-gray-500 text-center pb-1">
//         {Math.floor(currentTime / 60)}:
//         {String(Math.floor(currentTime % 60)).padStart(2, "0")}
//         {" / "}
//         {Math.floor(duration / 60)}:
//         {String(Math.floor(duration % 60)).padStart(2, "0")}
//       </div>
//     </div>
//      </div>

//   );
// };

// export default AudioPlayer;
