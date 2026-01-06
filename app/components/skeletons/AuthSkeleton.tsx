import Skeleton from "../ui/Skeleton";



export default function AuthSkeleton() {
  return (
    <div className="p-10 max-w-xl mx-auto space-y-6">
      <Skeleton className="h-8 w-48 mx-auto" />
      <Skeleton className="h-6 w-64 mx-auto" />
      <Skeleton className="h-6 w-40 mx-auto" />
    </div>
  );
}
