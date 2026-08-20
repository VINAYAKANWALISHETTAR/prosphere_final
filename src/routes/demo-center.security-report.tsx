import { createFileRoute, Link } from "@tanstack/react-router";
import { demoEngagement, demoFindings, remediationTimeline, severityOrder } from "@/data/demos";
import { DemoDataBadge } from "@/components/site/DemoDataBadge";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { severityClass, statusClass } from "@/lib/demo-style";

export const Route = createFileRoute("/demo-center/security-report")({
  head: () => ({
    meta: [
      { title: "Sample Security Report — ProSphere Demo Center" },
      {
        name: "description",
        content:
          "A complete example ProSphere security assessment report: scope, authorisation, ten findings with severity, evidence, remediation guidance and retest status.",
      },
      { property: "og:title", content: "Sample Security Report — ProSphere" },
      {
        property: "og:description",
        content: "See the structure of a ProSphere assessment report before you commit.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SecurityReportDemo,
});

function SecurityReportDemo() {
  const counts = severityOrder.map((s) => ({
    severity: s,
    count: demoFindings.filter((f) => f.severity === s).length,
  }));

  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <DemoDataBadge className="border-[#363636] bg-[#181818] text-[#92928D]" />
          <h1 className="mt-5 text-4xl font-bold text-navy-foreground sm:text-5xl">
            Sample security report
          </h1>
          <p className="mt-4 max-w-2xl text-navy-foreground/75">
            This is the report format ProSphere delivers. The system, client and findings below are
            invented.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <section aria-labelledby="scope">
          <h2 id="scope" className="text-2xl font-bold text-white">
            1. Scope and authorisation
          </h2>
          <dl className="mt-6 grid gap-4 rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card sm:grid-cols-2">
            {[
              ["Client", demoEngagement.client],
              ["Reference", demoEngagement.reference],
              ["Scope", demoEngagement.scope],
              ["Test window", demoEngagement.window],
              ["Performed by", demoEngagement.tester],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                  {label}
                </dt>
                <dd className="mt-1 text-sm text-[#C7C7C3]">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="summary" className="mt-14">
          <h2 id="summary" className="text-2xl font-bold text-white">
            2. Executive summary
          </h2>
          <p className="mt-4 leading-relaxed text-[#C7C7C3]">
            Ten findings were identified during the assessment window. Two are critical and require
            immediate attention: unrestricted login attempts and order records reachable by changing
            an identifier. Three high-severity items relate to stored script injection, session
            cookie configuration and password reset handling. The remaining findings are
            configuration and hygiene issues that reduce defence in depth. None of the issues
            required privileged access to discover, and all were confirmed with non-destructive
            testing.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-5">
            {counts.map((c) => (
              <div
                key={c.severity}
                className="rounded-lg border border-[#363636] bg-[#181818] p-4 text-center shadow-card"
              >
                <p className="text-2xl font-bold text-white">{c.count}</p>
                <p
                  className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${severityClass(c.severity)}`}
                >
                  {c.severity}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="findings" className="mt-14">
          <h2 id="findings" className="text-2xl font-bold text-white">
            3. Findings
          </h2>
          <div className="mt-6 space-y-5">
            {demoFindings.map((f, i) => (
              <Reveal
                as="article"
                key={f.id}
                delay={i * 30}
                className="rounded-xl border border-[#363636] bg-[#181818] p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-[#92928D]">{f.id}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityClass(f.severity)}`}
                  >
                    {f.severity}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass(f.status)}`}
                  >
                    {f.status}
                  </span>
                  <span className="rounded-full border border-[#363636] px-2.5 py-0.5 text-xs font-semibold text-[#92928D]">
                    {f.priority}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{f.title}</h3>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                      Affected area
                    </dt>
                    <dd className="mt-1 font-mono text-xs text-[#C7C7C3]">{f.area}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                      Evidence
                    </dt>
                    <dd className="mt-1 text-[#C7C7C3]">{f.evidence}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                      Impact
                    </dt>
                    <dd className="mt-1 text-[#C7C7C3]">{f.impact}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-[#92928D]">
                      Remediation
                    </dt>
                    <dd className="mt-1 text-[#C7C7C3]">{f.remediation}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="retest" className="mt-14">
          <h2 id="retest" className="text-2xl font-bold text-white">
            4. Remediation and retesting
          </h2>
          <ol className="mt-6 space-y-4 border-l border-[#363636] pl-6">
            {remediationTimeline.map((t) => (
              <li key={t.date} className="relative">
                <span
                  className="absolute -left-[1.9rem] top-1.5 size-3 rounded-full bg-[#1769E0]"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1769E0]">
                  {t.date}
                </p>
                <p className="mt-1 font-semibold text-white">{t.label}</p>
                <p className="text-sm text-[#92928D]">{t.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="ethics"
          className="mt-14 rounded-xl border border-[#363636] bg-[#111111] p-6"
        >
          <h2 id="ethics" className="text-lg font-semibold text-white">
            5. Testing conduct
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#C7C7C3]">
            All testing is non-destructive, performed inside the agreed window, and only on systems
            the client owns or is authorised in writing to test. No customer data is copied,
            retained or shared. Evidence is limited to the minimum needed to demonstrate a finding.
          </p>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/start-project">Request an assessment</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#363636] text-white hover:bg-[#202020]"
          >
            <Link to="/demo-center/vulnerability-dashboard">See the dashboard view</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
