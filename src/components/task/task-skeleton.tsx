export default function TaskSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 w-full bg-slate-200 rounded-xl" />
      ))}
    </div>
  );
}
