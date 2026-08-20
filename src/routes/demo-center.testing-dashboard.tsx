import { createFileRoute, Link } from "@tanstack/react-router";
import { demoDefects, demoTestRuns, performanceBudget } from "@/data/demos";
import { DemoDataBadge } from "@/components/site/DemoDataBadge";
import { Button } from "@/components/ui/button";
import { severityClass, statusClass } from "@/lib/demo-style";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo-center/testing-dashboard")({
  head: () => ({
    meta: [
      { title: "Testing Dashboard Demo — ProSphere" },
      {
        name: "description",
        content:
          "A sample ProSphere testing dashboard: functional, regression, compatibility, performance and accessibility runs with pass rates, open defects and performance budgets.",
      },
      { property: "og:title", content: "Testing Dashboard Demo — ProSphere" },
      {
        property: "og:description",
        content: "Pass rates, defects and performance budgets from a fictional test cycle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestingDashboardDemo,
});

function TestingDashboardDemo() {
  const total = demoTestRuns.reduce((n, r) => n + r.total, 0);
  const passed = demoTestRuns.reduce((n, r) => n + r.passed, 0);
  const failed = demoTestRuns.reduce((n, r) => n + r.failed, 0);
  const passRate = Math.round((passed / total) * 100);

  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <DemoDataBadge className="border-[#363636] bg-[#181818] text-[#92928D]" />
          <h1 className="mt-5 text-4xl font-bold text-navy-foreground sm:text-5xl">
            Testing dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/75">
            One release cycle across five suites. All runs, defects and figures are invented for
            demonstration.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Tests executed", value: total },
            { label: "Pass rate", value: `${passRate}%` },
            { label: "Failures", value: failed },
            {
              label: "Open defects",
              value: demoDefects.filter((d) => d.status !== "Resolved").length,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                {s.label}
              </p>
              <p className="mt-2 text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">Latest runs</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {demoTestRuns.map((r) => {
              const rate = Math.round((r.passed / r.total) * 100);
              return (
                <article
                  key={r.id}
                  className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-[#92928D]">{r.id}</span>
                    <span className="rounded-full bg-[#1769E0]/10 px-2.5 py-0.5 font-semibold text-[#1769E0]">
                      {r.type}
                    </span>
                    <span className="rounded-full border border-[#363636] px-2.5 py-0.5 font-semibold text-[#92928D]">
                      {r.environment}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{r.suite}</h3>
                  <div
                    className="mt-4 h-3 overflow-hidden rounded-full bg-[#363636]"
                    role="img"
                    aria-label={`${rate}% passed`}
                  >
                    <div
                      className="h-full rounded-full bg-[#4CCB91]"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <dl className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <dt className="text-xs text-[#92928D]">Passed</dt>
                      <dd className="font-semibold text-white">{r.passed}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#92928D]">Failed</dt>
                      <dd className="font-semibold text-[#D94A4A]">{r.failed}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#92928D]">Skipped</dt>
                      <dd className="font-semibold text-white">{r.skipped}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#92928D]">Time</dt>
                      <dd className="font-semibold text-white">{r.duration}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card">
            <h2 className="text-lg font-semibold text-white">Open defects</h2>
            <ul className="mt-5 divide-y divide-[#363636]">
              {demoDefects.map((d) => (
                <li key={d.id} className="flex flex-wrap items-center gap-3 py-3">
                  <span className="font-mono text-xs text-[#92928D]">{d.id}</span>
                  <span className="flex-1 text-sm font-medium text-white">{d.title}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      severityClass(d.severity),
                    )}
                  >
                    {d.severity}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      statusClass(d.status),
                    )}
                  >
                    {d.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card">
            <h2 className="text-lg font-semibold text-white">Performance budget</h2>
            <ul className="mt-5 divide-y divide-[#363636]">
              {performanceBudget.map((p) => (
                <li key={p.metric} className="flex items-center gap-3 py-3">
                  <span className="flex-1 text-sm font-medium text-white">{p.metric}</span>
                  <span className="text-sm tabular-nums text-[#C7C7C3]">{p.value}</span>
                  <span className="text-xs text-[#92928D]">target {p.target}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      p.ok ? "bg-[#4CCB91]/15 text-[#4CCB91]" : "bg-[#D94A4A]/15 text-[#D94A4A]",
                    )}
                  >
                    {p.ok ? "Within" : "Over"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/start-project">Request a test cycle</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#363636] text-white hover:bg-[#202020]"
          >
            <Link to="/demo-center">Back to Demo Center</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
