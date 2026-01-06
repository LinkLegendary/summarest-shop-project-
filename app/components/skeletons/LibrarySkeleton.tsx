import Skeleton from "../ui/Skeleton";



export default function LibrarySkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 space-y-16">
      {/* Search */}
      <Skeleton className="h-10 w-full max-w-xl mx-auto" />

      {/* Saved Books */}
      <section className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-24" />

        <div className="bg-[#f3f8f6] rounded-xl px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <Skeleton className="h-[240px] w-[160px] rounded-md" />
                <Skeleton className="h-4 w-32 mt-2" />
                <Skeleton className="h-3 w-20 mt-1" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finished */}
      <section className="space-y-3">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-24" />

        <div className="bg-[#f3f8f6] rounded-xl px-6 py-6">
          <Skeleton className="h-4 w-48 mx-auto" />
          <Skeleton className="h-3 w-64 mx-auto mt-4" />
        </div>
      </section>
    </div>
  );
}
