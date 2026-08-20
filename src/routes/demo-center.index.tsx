import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, FileText } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { DemoDataBadge } from "@/components/site/DemoDataBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo-center/")({
  head: () => ({
    meta: [
      { title: "Demo Center — See ProSphere Reports and Dashboards" },
      {
        name: "description",
        content:
          "Explore fictional but realistic examples of a ProSphere security report, vulnerability dashboard, testing dashboard and delivered work.",
      },
      { property: "og:title", content: "ProSphere Demo Center" },
      {
        property: "og:description",
        content:
          "Sample security report, vulnerability dashboard, testing dashboard and delivered work.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemoCenterPage,
});

const demos = [
  {
    to: "/demo-center/security-report",
    icon: FileText,
    title: "Security report",
    body: "A full sample assessment report: scope, authorisation, findings with severity, evidence, remediation and retest status.",
  },
  {
    to: "/demo-center/vulnerability-dashboard",
    icon: Activity,
    title: "Vulnerability dashboard",
    body: "Severity breakdown, remediation progress and a filterable findings table for a fictional engagement.",
  },
  {
    to: "/demo-center/testing-dashboard",
    icon: BarChart3,
    title: "Testing dashboard",
    body: "Test runs across functional, regression, compatibility, performance and accessibility suites, plus open defects.",
  },
] as const;

function DemoCenterPage() {
  return (
    <div>
      <section className="navy-panel grid-backdrop">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <DemoDataBadge
            className="border-[#363636] bg-[#181818] text-[#92928D]"
            label="All content is fictional"
          />
          <h1 className="mt-5 max-w-3xl text-4xl font-bold text-navy-foreground sm:text-5xl">
            Demo Center
          </h1>
          <p className="mt-4 max-w-2xl text-white">
            See exactly what you receive before you commit to anything. Every figure, finding and
            client name below is invented for demonstration and does not describe a real system or
            customer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/demo-center/security-report">Open the sample report</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#363636] bg-transparent text-white hover:bg-[#202020]"
            >
              <Link to="/start-project">Start a Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore" title="Four ways to see the work" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {demos.map((d, i) => (
            <Reveal
              as="article"
              key={d.to}
              delay={i * 60}
              className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card"
            >
              <d.icon className="size-6 text-[#1769E0]" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-white">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#92928D]">{d.body}</p>
              <Button asChild variant="link" className="mt-3 h-auto p-0 text-[#1769E0]">
                <Link to={d.to}>Open {d.title.toLowerCase()}</Link>
              </Button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#111111] py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white">Want this run against your own site?</h2>
          <p className="mt-3 text-[#92928D]">
            Assessments only ever run on systems you own or are authorised in writing to test.
          </p>
          <Button asChild size="lg" className="mt-6 bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/start-project">Start a project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
