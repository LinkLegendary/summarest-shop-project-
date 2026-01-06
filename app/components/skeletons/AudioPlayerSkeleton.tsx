// components/skeletons/AudioPlayerSkeleton.tsx
import Skeleton from "../ui/Skeleton";

export default function AudioPlayerSkeleton() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-1200
        bg-gray-100
        px-4 py-3
        lg:left-56
        lg:w-[calc(100%-14rem)]
      "
    >
      <div
        className="
          max-w-5xl mx-auto
          flex items-center gap-4
          px-4 py-2
        "
      >
        {/* Controls */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>

        {/* Seek Bar */}
        <Skeleton className="h-1 w-full rounded-full" />

        {/* Time */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-2" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}