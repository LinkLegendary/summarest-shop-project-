
import Skeleton from "../../components/ui/Skeleton";


export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-6 mt-10">
      <Skeleton className="h-8 w-64" />        {/* Title */}
      <Skeleton className="h-5 w-40" />        {/* Author */}
      <Skeleton className="h-4 w-56" />        {/* Subtitle */}
      <Skeleton className="h-4 w-32" />        {/* Rating */}

      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <Skeleton className="aspect-3/4 w-full" /> {/* Image */}
      </div>

      <Skeleton className="h-6 w-48" />        {/* Section title */}
      <Skeleton className="h-4 w-full" />      {/* Summary line 1 */}
      <Skeleton className="h-4 w-5/6" />       {/* Summary line 2 */}
      <Skeleton className="h-4 w-4/6" />       {/* Summary line 3 */}

      <Skeleton className="h-12 w-full" />     {/* Audio player */}
    </div>
  );
}
