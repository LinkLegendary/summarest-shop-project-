// components/skeletons/BookClientSkeleton.tsx
import Skeleton from "../ui/Skeleton";

export default function BookClientSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Book Image */}
        <div className="relative w-full sm:w-64 md:w-72 h-80 mx-auto sm:mx-0">
          <Skeleton className="w-full h-full rounded-md" />
        </div>

        {/* Book Info */}
        <div className="flex-1">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Author */}
          <Skeleton className="h-4 w-1/3 mt-2" />

          {/* Subtitle */}
          <Skeleton className="h-4 w-full mt-3" />
          <Skeleton className="h-4 w-5/6 mt-2" />

          {/* Rating */}
          <Skeleton className="h-4 w-1/4 mt-3" />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>

            <Skeleton className="h-10 w-full sm:w-48" />
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      {/* Description */}
      <div className="mt-10">
        <Skeleton className="h-6 w-48" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Author */}
      <div className="mt-8">
        <Skeleton className="h-6 w-56" />
        <div className="mt-3 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}