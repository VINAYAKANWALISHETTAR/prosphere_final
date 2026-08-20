import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted = false,
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "text-center")}>
        <span
          aria-hidden="true"
          className={cn(
            "mb-3 block h-1 w-8 rounded-full bg-violet",
            align === "center" && "mx-auto",
          )}
        />
        {eyebrow ? (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.2em]",
              inverted ? "text-primary-foreground/70" : "text-primary",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn("mt-2 text-3xl font-bold sm:text-4xl", inverted && "text-navy-foreground")}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              inverted ? "text-navy-foreground/75" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
