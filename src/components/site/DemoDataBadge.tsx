import { FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoDataBadge({
  className,
  label = "Demo data",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-violet",
        className,
      )}
    >
      <FlaskConical className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
