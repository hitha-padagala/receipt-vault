import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("mt-4 h-2 overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-sky-500" style={{ width: `${value}%` }} />
    </div>
  );
}
