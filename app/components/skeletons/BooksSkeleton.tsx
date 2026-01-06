import Skeleton from "../ui/Skeleton";




export default function BooksSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 space-y-16">
      
      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Selected */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-64 mx-auto" />
        <Skeleton className="h-75 w-full max-w-xl mx-auto" />
      </section>

      {/* Recommended */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="flex gap-6 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-55 w-40 rounded-md" />
          ))}
        </div>
      </section>

      {/* Suggested */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-64 mx-auto" />
        <div className="flex gap-6 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-55 w-40 rounded-md" />
          ))}
        </div>
      </section>
    </div>
   
  );
}
