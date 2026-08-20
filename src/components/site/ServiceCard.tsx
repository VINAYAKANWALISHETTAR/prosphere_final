import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/prosphere";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ServiceCard({ service, categoryName }: { service: Service; categoryName: string }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-violet/60 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug">{service.name}</h3>
        <Badge variant="secondary" className="shrink-0 font-medium">
          {categoryName}
        </Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Example deliverables
        </p>
        <ul className="mt-2 space-y-1.5">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-foreground/80">
              <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{service.engagement}</p>

      <div className="mt-6 flex flex-wrap gap-2 border-t pt-4">
        <Button asChild size="sm">
          <Link to="/start-project" search={{ service: service.slug }}>
            Request service
          </Link>
        </Button>
        <Button asChild size="sm" variant="ghost">
          <Link to="/how-it-works">
            View details
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
