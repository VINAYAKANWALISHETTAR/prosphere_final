import type { FindingStatus, Severity } from "@/data/demos";

export function severityClass(severity: Severity | string) {
  switch (severity) {
    case "Critical":
      return "bg-destructive/15 text-destructive";
    case "High":
      return "bg-orange-500/15 text-orange-600 dark:text-orange-400";
    case "Medium":
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400";
    case "Low":
      return "bg-primary/10 text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function statusClass(status: FindingStatus | string) {
  switch (status) {
    case "Resolved":
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";
    case "In progress":
      return "bg-primary/10 text-primary";
    case "Retest":
      return "bg-violet/15 text-violet";
    default:
      return "bg-muted text-muted-foreground";
  }
}
