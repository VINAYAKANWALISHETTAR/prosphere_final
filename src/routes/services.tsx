import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bug, LifeBuoy, Search, ShieldCheck, Wrench } from "lucide-react";
import { prosphereCategories, prosphereServices } from "@/data/prosphere";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceVisual } from "@/components/site/ServiceVisuals";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "ProSphere Services — Security, Testing, Maintenance, Support" },
      {
        name: "description",
        content:
          "Browse ProSphere services: authorised security assessments, website and application testing, ongoing maintenance and technical support.",
      },
      {
        property: "og:title",
        content: "ProSphere Services — Security, Testing, Maintenance, Support",
      },
      {
        property: "og:description",
        content:
          "Authorised security assessments, testing, maintenance and technical support for websites and applications.",
      },
    ],
  }),
  component: ServicesPage,
});

const categoryIcons: Record<string, typeof ShieldCheck> = {
  security: ShieldCheck,
  testing: Bug,
  maintenance: Wrench,
  support: LifeBuoy,
};

const featuredSlugs = ["performance-testing", "bug-fixing", "technical-consultation"];

const serviceVisualMap: Record<string, string> = {
  "website-security-assessment": "report",
  "application-security-assessment": "report",
  "vulnerability-identification": "dashboard",
  "security-testing": "report",
  "security-configuration-review": "checklist",
  "security-hardening-guidance": "before-after",
  "security-documentation": "report",
  "security-reports": "report",
  "security-monitoring-guidance": "checklist",
  "website-testing": "flow",
  "application-testing": "flow",
  "functional-testing": "flow",
  "ui-testing": "flow",
  "compatibility-testing": "flow",
  "performance-testing": "dashboard",
  "regression-testing": "workflow",
  "quality-assurance": "workflow",
  "bug-identification": "dashboard",
  "test-report-generation": "workflow",
  "website-maintenance": "checklist",
  "application-maintenance": "checklist",
  "bug-fixing": "before-after",
  "technical-maintenance": "checklist",
  "performance-optimization": "dashboard",
  "content-technical-updates": "checklist",
  "dependency-review": "checklist",
  "backup-recovery-guidance": "checklist",
  "technical-health-checks": "checklist",
  troubleshooting: "flow",
  "technical-consultation": "flow",
  "website-issue-analysis": "flow",
  "application-issue-analysis": "flow",
  "deployment-assistance": "flow",
  "configuration-assistance": "flow",
  "technical-documentation": "report",
  "project-guidance": "flow",
};

const catalogueTabs = [
  { id: "all", label: "All" },
  { id: "security", label: "Security" },
  { id: "testing", label: "Testing" },
  { id: "maintenance", label: "Maintenance" },
  { id: "support", label: "Technical Support" },
] as const;

function ServicesPage() {
  const [query, setQuery] = useState("");
  const [catalogueOpen, setCatalogueOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const catalogueRef = useRef<HTMLDivElement | null>(null);

  const featuredServices = useMemo(
    () =>
      featuredSlugs.map((slug) => prosphereServices.find((s) => s.slug === slug)).filter(Boolean),
    [],
  );

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    let services = prosphereServices;

    if (activeTab !== "all") {
      const categoryMap: Record<string, string> = {
        security: "security",
        testing: "testing",
        maintenance: "maintenance",
        support: "support",
      };
      services = services.filter((s) => s.category === categoryMap[activeTab]);
    }

    if (q) {
      services = services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }

    return services;
  }, [query, activeTab]);

  const openCatalogue = () => {
    setCatalogueOpen(true);
    setTimeout(() => {
      catalogueRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="max-w-3xl text-4xl font-bold text-navy-foreground sm:text-5xl">
            Technical services for your digital products
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/75">
            Security, testing, maintenance and technical support for websites, applications and
            digital products.
          </p>

          <div className="mt-8 flex flex-col gap-3 rounded-xl bg-[#111111] p-3 shadow-lift sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#92928D]"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, e.g. website security, testing, bug fixing"
                aria-label="Search services"
                className="h-12 border-0 bg-[#181818] pl-9 text-white shadow-none focus-visible:ring-0"
              />
            </div>
            <Button size="lg" className="h-12 bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              Search
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="WHAT DO YOU NEED HELP WITH?"
          title="Four core areas"
          description="Choose the area that matches your needs, then explore the services we offer."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {prosphereCategories.map((category, i) => {
            const Icon = categoryIcons[category.id] ?? ShieldCheck;
            const iconColor =
              category.id === "security"
                ? "#1769E0"
                : category.id === "maintenance"
                  ? "#E83E8C"
                  : "#FFFFFF";
            const accentColor =
              category.id === "security"
                ? "#1769E0"
                : category.id === "maintenance"
                  ? "#E83E8C"
                  : "#0A0A0A";

            return (
              <Link
                key={category.id}
                to="/services"
                className="group flex h-full flex-col rounded-[0.5rem] border border-[#363636] bg-[#181818] p-6 transition-all duration-200 hover:-translate-y-[2px] hover:border-[#0A0A0A]/60 hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                style={{ borderTop: `3px solid ${accentColor}` }}
              >
                <Icon
                  className="size-7 transition-colors duration-200 group-hover:opacity-80"
                  style={{ color: iconColor }}
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold text-white">{category.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#C7C7C3]">
                  {category.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1769E0] transition-colors duration-200 group-hover:text-[#0F56BD]">
                  View services
                  <span className="transition-transform duration-200 group-hover:translate-x-[3px]">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FEATURED SERVICES"
          title="Where to start"
          description="Three common starting points covering the most requested ProSphere services."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => {
            if (!service) return null;
            const category = prosphereCategories.find((c) => c.id === service.category);
            return (
              <Link
                key={service.slug}
                to={`/services#service-${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-[#363636] bg-[#181818] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#1769E0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1769E0]">
                  {category?.name ?? "Service"}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.04em] text-white">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#C7C7C3]">{service.description}</p>
                <span
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#1769E0] transition-colors duration-200 group-hover:text-[#0F56BD]"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(`service-${service.slug}`)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ cursor: "pointer" }}
                >
                  View service
                  <span className="transition-transform duration-200 group-hover:translate-x-[3px]">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="bg-[#1769E0] text-white hover:bg-[#0F56BD]"
            onClick={openCatalogue}
          >
            Explore full catalogue <ArrowRight className="ml-2 size-4" aria-hidden="true" />
          </Button>
        </div>
      </section>

      {catalogueOpen && (
        <section ref={catalogueRef} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading
              eyebrow="COMPLETE CATALOGUE"
              title="All ProSphere services"
              description="Browse the full service library. Select a category or search to find what you need."
            />
            <Button
              variant="outline"
              size="sm"
              className="border-[#363636] text-[#C7C7C3] hover:bg-[#202020]"
              onClick={() => setCatalogueOpen(false)}
            >
              Hide services
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {catalogueTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="rounded-md border px-4 py-1.5 text-xs font-medium transition-colors"
                style={{
                  borderColor: activeTab === tab.id ? "#1769E0" : "#363636",
                  backgroundColor: activeTab === tab.id ? "#1769E0" : "transparent",
                  color: activeTab === tab.id ? "#FFFFFF" : "#C7C7C3",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {query.trim().length > 0 && (
            <p className="mt-4 text-sm text-[#92928D]">
              Showing {filteredServices.length} result{filteredServices.length === 1 ? "" : "s"} for
              &ldquo;{query.trim()}&rdquo;
            </p>
          )}

          <div className="mt-8 space-y-3">
            {filteredServices.map((service) => {
              const categoryName =
                prosphereCategories.find((c) => c.id === service.category)?.name ??
                service.category;
              return (
                <div
                  key={service.slug}
                  id={`service-${service.slug}`}
                  className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-lg border border-[#363636] bg-[#181818] px-5 py-4 transition-all duration-200 hover:border-[#1769E0]/60 sm:grid-cols-[auto_1fr_auto]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.35rem] border border-[#363636] bg-[#111111] text-xs font-semibold uppercase tracking-[0.15em] text-[#1769E0]">
                    {categoryName.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
                      {categoryName}
                    </p>
                    <h3 className="mt-0.5 truncate text-base font-semibold text-white">
                      {service.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#C7C7C3]">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <p className="mt-10 rounded-lg border border-dashed p-10 text-center text-[#92928D]">
              No services match that search. Try a different term or clear the filters.
            </p>
          )}
        </section>
      )}

      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="HOW WE HELP"
                title="Assess · Test · Fix · Maintain"
                description="A clear path from initial assessment to ongoing technical support."
              />
              <p className="mt-4 text-base leading-relaxed text-[#C7C7C3]">
                Every engagement follows the same transparent process: scope and authorisation,
                testing and analysis, structured reporting, remediation guidance, retesting and
                ongoing maintenance.
              </p>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
                  <Link to="/start-project">
                    Start a Project <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Assess",
                  body: "Security reviews, vulnerability identification and configuration audits.",
                },
                {
                  label: "Test",
                  body: "Functional, performance, regression and compatibility testing.",
                },
                { label: "Fix", body: "Bug fixing, remediation guidance and verification." },
                { label: "Maintain", body: "Ongoing upkeep, updates and technical health checks." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#363636] bg-[#181818] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1769E0]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#C7C7C3]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Still here? Let&apos;s talk.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#C7C7C3]">
              Tell us what you&apos;re building, what you need, or where you&apos;re stuck. No need
              to figure everything out first — just tell us what you need.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
            <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/start-project">Tell us what you need</Link>
            </Button>
            <Button asChild size="lg" className="border-[#363636] text-white hover:bg-[#202020]">
              <Link to="/start-project">Start a Project</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
