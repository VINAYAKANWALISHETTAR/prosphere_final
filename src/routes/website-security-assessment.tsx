import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/website-security-assessment")({
  head: () => ({
    meta: [
      { title: "Website Security Assessment | ProSphere" },
      {
        name: "description",
        content:
          "Run a safe initial check of your website and identify areas that may need attention with ProSphere's automated security assessment.",
      },
    ],
  }),
  component: WebsiteSecurityAssessment,
});

type CheckStep = "https" | "headers" | "cookies" | "exposure" | "config" | "tech";
type FindingSeverity = "critical" | "high" | "medium" | "low";

interface Finding {
  id: string;
  severity: FindingSeverity;
  title: string;
  affected: string;
  whyMatters: string;
  recommendation: string;
}

function WebsiteSecurityAssessment() {
  const [stage, setStage] = useState<"hero" | "checking" | "results">("hero");
  const [url, setUrl] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<CheckStep[]>([]);
  const [results, setResults] = useState<{
    critical: number;
    high: number;
    medium: number;
    low: number;
    findings: Finding[];
    status: "good" | "needs-attention" | "high-risk";
  } | null>(null);

  const steps: { id: CheckStep; label: string }[] = [
    { id: "https", label: "Website reachable" },
    { id: "headers", label: "HTTPS checked" },
    { id: "cookies", label: "TLS information checked" },
    { id: "exposure", label: "Security headers checked" },
    { id: "config", label: "Cookie configuration checked" },
    { id: "tech", label: "Technology signals reviewed" },
  ];

  const checks = [
    { icon: "🔒", label: "HTTPS & TLS", desc: "Certificate and encryption validation" },
    { icon: "🛡️", label: "Security Headers", desc: "HTTP security control headers" },
    { icon: "🍪", label: "Cookie Security", desc: "Session and cookie configuration" },
    { icon: "📡", label: "Public Exposure", desc: "Accessible resources and endpoints" },
    { icon: "⚙️", label: "Configuration", desc: "Server and application settings" },
    { icon: "🔍", label: "Technology Signals", desc: "Detected frameworks and libraries" },
  ];

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const parsed = new URL(inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  };

  const simulateCheck = async () => {
    if (!url.trim() || !authorized) return;

    setStage("checking");
    setCompletedSteps([]);

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setCompletedSteps((prev) => [...prev, step.id]);
    }

    const demoFindings: Finding[] =
      demoMode || url.includes("demo")
        ? [
            {
              id: "1",
              severity: "high",
              title: "Missing security headers",
              affected: "HTTP response configuration",
              whyMatters:
                "Security headers tell browsers how to handle your site. Missing headers leave you vulnerable to common attacks.",
              recommendation:
                "Add X-Frame-Options, X-Content-Type-Options, and Strict-Transport-Security headers.",
            },
            {
              id: "2",
              severity: "high",
              title: "Weak TLS configuration",
              affected: "SSL/TLS settings",
              whyMatters:
                "Outdated TLS versions and weak cipher suites can be exploited to intercept data.",
              recommendation: "Enforce TLS 1.2 or higher and disable older protocol versions.",
            },
            {
              id: "3",
              severity: "medium",
              title: "Cookie security configuration",
              affected: "Session cookies",
              whyMatters:
                "Cookies without proper flags can be accessed by malicious scripts or transmitted over unencrypted connections.",
              recommendation: "Set Secure and HttpOnly flags on all authentication cookies.",
            },
            {
              id: "4",
              severity: "medium",
              title: "Information disclosure",
              affected: "Error pages and server headers",
              whyMatters:
                "Detailed error messages or server versions can give attackers useful reconnaissance information.",
              recommendation:
                "Return generic error pages and remove server identification from response headers.",
            },
            {
              id: "5",
              severity: "low",
              title: "Outdated framework detected",
              affected: "Backend technology stack",
              whyMatters:
                "Older framework versions may have known vulnerabilities that attackers can exploit.",
              recommendation: "Update to the latest stable version of your framework.",
            },
            {
              id: "6",
              severity: "low",
              title: "CORS configuration",
              affected: "Cross-origin requests",
              whyMatters:
                "Overly permissive CORS settings can allow unauthorized cross-origin data access.",
              recommendation: "Restrict CORS to trusted origins only.",
            },
          ]
        : [];

    const criticalCount = demoFindings.filter((f) => f.severity === "critical").length;
    const highCount = demoFindings.filter((f) => f.severity === "high").length;
    const mediumCount = demoFindings.filter((f) => f.severity === "medium").length;
    const lowCount = demoFindings.filter((f) => f.severity === "low").length;

    setResults({
      critical: criticalCount,
      high: highCount,
      medium: mediumCount,
      low: lowCount,
      findings: demoFindings,
      status: highCount > 0 ? "needs-attention" : mediumCount > 0 ? "good" : "good",
    });

    setStage("results");
  };

  const displayUrl = demoMode ? "demo.prosphere.example" : url;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-[#2A2A2A] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#92928D]">
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <span>→</span>
            <Link to="/services" className="hover:text-white">
              Security
            </Link>
            <span>→</span>
            <span className="font-medium text-white">Website Security Assessment</span>
          </div>
        </div>
      </div>

      {stage === "hero" && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1769E0]">
              WEBSITE SECURITY ASSESSMENT
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Check your website's security posture
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#C7C7C3]">
              Run a safe initial check of your website and identify areas that may need attention
              before requesting a deeper authorised security assessment.
            </p>
          </div>

          <Reveal>
            <div className="rounded-2xl border border-[#363636] bg-[#181818] p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                <Input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 border-[#363636] bg-[#0A0A0A] px-4 py-3 text-base text-white"
                />
                <Button
                  onClick={() => simulateCheck()}
                  disabled={!url.trim() || !authorized || !validateUrl(url)}
                  className="whitespace-nowrap bg-[#1769E0] text-white hover:bg-[#0F56BD]"
                  size="lg"
                >
                  Check Website <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>

              <p className="mt-3 text-xs text-[#92928D]">
                Security checks are performed only on websites you own or are authorised to assess.
              </p>

              <div className="mt-4 flex items-start gap-3 rounded-lg border border-[#363636] bg-[#0A0A0A] p-3">
                <input
                  type="checkbox"
                  id="authorize"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                  className="mt-1 cursor-pointer accent-[#1769E0]"
                />
                <label
                  htmlFor="authorize"
                  className="cursor-pointer text-xs leading-relaxed text-[#C7C7C3]"
                >
                  I confirm that I own this website or have permission to check it.
                </label>
              </div>

              <button
                onClick={() => setDemoMode(!demoMode)}
                className="mt-4 text-xs font-medium text-[#1769E0] transition-colors hover:text-[#0F56BD]"
              >
                {demoMode ? "✓ Demo mode active" : "Try demo mode"}
              </button>
            </div>
          </Reveal>

          <div className="mt-12">
            <h2 className="text-xl font-bold text-white">What this check does</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {checks.map((check, i) => (
                <Reveal key={check.label} delay={i * 50}>
                  <div className="rounded-xl border border-[#363636] bg-[#181818] p-4 text-center">
                    <div className="text-3xl">{check.icon}</div>
                    <h3 className="mt-3 font-semibold text-white">{check.label}</h3>
                    <p className="mt-2 text-xs text-[#92928D]">{check.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {stage === "checking" && (
        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Checking your website</h1>
            <p className="mt-2 text-lg text-[#C7C7C3]">{displayUrl}</p>
          </div>

          <div className="mt-12 space-y-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-4 rounded-lg border border-[#363636] bg-[#111111] p-4"
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle2 className="size-5 text-[#4CCB91] flex-shrink-0" />
                ) : (
                  <div className="size-5 flex-shrink-0 rounded-full border-2 border-[#363636] animate-pulse" />
                )}
                <span
                  className={
                    completedSteps.includes(step.id) ? "text-white font-medium" : "text-[#92928D]"
                  }
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {stage === "results" && results && (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Security check results</h1>
          <p className="mt-2 text-lg text-[#C7C7C3]">{displayUrl}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              {
                label: "Critical",
                count: results.critical,
                color: "bg-[#D94A4A]/15 text-[#D94A4A] border-[#D94A4A]/40",
              },
              {
                label: "High",
                count: results.high,
                color: "bg-[#D94A4A]/15 text-[#D94A4A] border-[#D94A4A]/40",
              },
              {
                label: "Medium",
                count: results.medium,
                color: "bg-[#D9A62E]/15 text-[#D9A62E] border-[#D9A62E]/40",
              },
              {
                label: "Low",
                count: results.low,
                color: "bg-[#363636] text-[#C7C7C3] border-[#4A4A4A]",
              },
            ].map((item) => (
              <div key={item.label} className={`rounded-lg border-2 ${item.color} p-4 text-center`}>
                <div className="text-3xl font-black">{item.count}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.1em]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border-2 border-[#363636] bg-[#111111] p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-1 size-5 text-[#1769E0] flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white">Overall status</h3>
                <p className="mt-2 text-sm text-[#C7C7C3]">
                  {results.high > 0
                    ? "⚠️ Needs attention — high-severity indicators detected"
                    : results.medium > 0
                      ? "✓ No high-severity indicators detected by this initial check."
                      : "✓ No issues were detected by the checks performed."}
                </p>
              </div>
            </div>
          </div>

          {results.findings.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-white">Findings</h2>
              <div className="mt-6 space-y-4">
                {results.findings.map((finding) => (
                  <Reveal key={finding.id}>
                    <details className="group rounded-lg border border-[#363636] bg-[#181818]">
                      <summary className="flex cursor-pointer items-start gap-4 p-4">
                        <div
                          className={[
                            "mt-1 size-2.5 flex-shrink-0 rounded-full",
                            finding.severity === "critical"
                              ? "bg-[#D94A4A]"
                              : finding.severity === "high"
                                ? "bg-[#D94A4A]"
                                : finding.severity === "medium"
                                  ? "bg-[#D9A62E]"
                                  : "bg-[#6F6F6B]",
                          ].join(" ")}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={[
                                "inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]",
                                finding.severity === "critical"
                                  ? "bg-[#D94A4A]/15 text-[#D94A4A]"
                                  : finding.severity === "high"
                                    ? "bg-[#D94A4A]/15 text-[#D94A4A]"
                                    : finding.severity === "medium"
                                      ? "bg-[#D9A62E]/15 text-[#D9A62E]"
                                      : "bg-[#363636] text-[#C7C7C3]",
                              ].join(" ")}
                            >
                              {finding.severity}
                            </span>
                            <h3 className="font-semibold text-white">{finding.title}</h3>
                          </div>
                        </div>
                        <span className="text-[#92928D] group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="border-t border-[#363636] px-4 py-4 text-sm text-[#C7C7C3]">
                        <div className="mb-4">
                          <h4 className="font-semibold text-white">Affected area</h4>
                          <p className="mt-1">{finding.affected}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-semibold text-white">Why it matters</h4>
                          <p className="mt-1">{finding.whyMatters}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Recommendation</h4>
                          <p className="mt-1">{finding.recommendation}</p>
                        </div>
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 rounded-lg border border-[#363636] bg-[#111111] p-4 text-[11px] leading-relaxed text-[#92928D]">
            <p className="font-semibold text-white">PRELIMINARY CHECK</p>
            <p className="mt-2">
              This automated check is non-destructive and provides an initial indication of security
              posture. It does not replace a comprehensive security assessment or authorised
              penetration test.
            </p>
          </div>

          <div className="mt-10 rounded-lg border border-[#363636] bg-[#181818] p-6">
            <h3 className="font-bold text-white">Want a deeper assessment?</h3>
            <p className="mt-2 text-[#C7C7C3]">
              Our authorised security assessments provide structured testing, evidence-backed
              findings, prioritised remediation guidance and retesting where applicable.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
                <Link to="/start-project">Request Security Assessment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#363636] text-white hover:bg-[#202020]"
              >
                <Link to="/start-project">Talk to ProSphere</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
