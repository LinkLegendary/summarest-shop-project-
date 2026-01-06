"use client";

import { useRef, useState, useEffect } from "react";

export default function AudioDemo() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const updateTime = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };


  /**
   * Calculates the sum of two numbers.
   * @param {number} a First number
   * @param {number} b Second number
   * @returns {number} The sum of a and b
   */


  const logDuration = () => {
    if (!audioRef.current) return;
    console.log("Audio duration:", audioRef.current.duration);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!audioRef.current) return;
      setCurrentTime(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-40">
      <audio
        ref={audioRef}
        src="/music_loop.mp3"
        controls
        onLoadedMetadata={logDuration}
      />

      <p>Current Time: {currentTime.toFixed(1)}</p>

      <button
        onClick={() => console.log(audioRef.current?.duration)}
        className="border px-2 py-1 mt-2"
      >
        Log Duration
      </button>
    </div>
  );
}












// "use client";

// import { useRef, useState } from "react";

// export default function UseRefDemo() {
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const clickCountRef = useRef(3);
//   const [renders, setRenders] = useState(5);
//   const [visual, setVisual] = useState(0)

//   const focusInput = () => {
//     inputRef.current?.focus();
//   };

//   const increaseRefCount = () => {
//     clickCountRef.current += 1;
//     console.log("Ref count:", clickCountRef.current);
//     console.log("Ref count2:", clickCountRef);
//    setVisual(clickCountRef.current)
//   };

//   const visualResetFuncion = () => {
//     setVisual(0)
//   }

//   return (
//     <div className="p-6 space-y-4 border rounded">
//       <h2 className="text-xl font-bold">useRef Demo</h2>

//       <input
//         ref={inputRef}
//         className="border px-2 py-1"
//         placeholder="Click focus button"
//       />

//       <button onClick={focusInput}>Focus Input</button>
//       <button onClick={increaseRefCount}>Increase Ref Counter</button>

//       <p>Component renders: {renders}</p>

//       {/* ✅ Ref is NOT rendered */}
//       <button onClick={() => setRenders(renders + 1)}>
//         Force Re-render
//       </button>
//       <p>visual count :{visual}</p>
//       <button
//       className="relative border w-20 h-8
//       rounded-md bg-amber-400"
//       onClick={visualResetFuncion}
//       >
//       visualreset

//       </button>

//     </div>
//   );
// }

