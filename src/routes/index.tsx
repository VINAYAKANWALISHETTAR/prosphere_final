import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bug, LifeBuoy, Search, ShieldCheck, Wrench } from "lucide-react";
import { brandAssets, DIGICRYSTAL_TAGLINE, PROSPHERE_TAGLINE } from "@/lib/brand";

import { prosphereCategories } from "@/data/prosphere";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { SecurityAssessmentWidget } from "@/components/site/SecurityAssessmentWidget";
import { DigiCrystalPreview } from "@/components/site/DigiCrystalPreviews";
import { DigiCrystalCarousel } from "@/components/site/DigiCrystalCarousel";
import { ServiceVisual } from "@/components/site/ServiceVisuals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProSphere — Technical Services Platform" },
      {
        name: "description",
        content:
          "ProSphere is a technical services platform for website and application security, testing, maintenance and technical support, with DigiCrystal Technologies for creative, AI and automation work.",
      },
      { property: "og:title", content: "ProSphere — Technical Services Platform" },
      {
        property: "og:description",
        content: "Secure, test, maintain and improve websites and applications with ProSphere.",
      },
    ],
  }),
  component: HomePage,
});

const categoryIcons: Record<string, typeof ShieldCheck> = {
  security: ShieldCheck,
  testing: Bug,
  maintenance: Wrench,
  support: LifeBuoy,
};

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [previewTab, setPreviewTab] = useState("website");
  const [autoRotate, setAutoRotate] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const serviceShowcase = [
    {
      id: "website-security-assessment",
      category: "security",
      title: "Website Security Assessment",
      summary:
        "Authorised review of a website's exposed surface, configuration and security controls.",
      outcome: "Findings • Evidence • Remediation • Retest",
      action: "Start security check",
      href: "/website-security-assessment",
      visual: "report",
    },
    {
      id: "application-security-assessment",
      category: "security",
      title: "Application Security Assessment",
      summary:
        "Assessment of web or business applications covering authentication, authorisation, input handling and configuration.",
      outcome: "Risk-rated findings • Evidence • Remediation plan",
      action: "View methodology",
      href: "/services",
      visual: "flow",
    },
    {
      id: "vulnerability-identification",
      category: "security",
      title: "Vulnerability Identification",
      summary:
        "Focused identification of known weaknesses across dependencies, configuration and exposed endpoints.",
      outcome: "Vulnerability inventory • Severity • Priority • Suggested fixes",
      action: "View sample findings",
      href: "/demo-center/vulnerability-dashboard",
      visual: "dashboard",
    },
    {
      id: "security-testing",
      category: "testing",
      title: "Security Testing",
      summary: "Authorised testing of agreed features, flows, APIs or functionality.",
      outcome: "Test log • Reproduction steps • Impact • Recommendations",
      action: "View sample test",
      href: "/demo-center/testing-dashboard",
      visual: "workflow",
    },
    {
      id: "security-configuration-review",
      category: "security",
      title: "Security Configuration Review",
      summary:
        "Review server, platform, CMS and application configuration against practical hardening baselines.",
      outcome: "Checklist • Gap analysis • Hardening steps",
      action: "View sample checklist",
      href: "/services",
      visual: "checklist",
    },
    {
      id: "security-hardening-guidance",
      category: "security",
      title: "Security Hardening Guidance",
      summary:
        "Practical guidance to strengthen security controls and reduce avoidable weaknesses.",
      outcome: "Hardening plan • Implementation notes • Verification checklist",
      action: "View example",
      href: "/services",
      visual: "before-after",
    },
  ];

  const visibleServices = serviceShowcase;

  const processStages = [
    {
      number: "01",
      title: "Share your website or application",
      body: "You provide the relevant project information, scope and access details.",
    },
    {
      number: "02",
      title: "Initial assessment",
      body: "We review the requested scope, technical requirements and authorisation before work begins.",
    },
    {
      number: "03",
      title: "Testing & analysis",
      body: "Authorised security, functional, performance or technical testing is carried out against the agreed scope.",
    },
    {
      number: "04",
      title: "Identify issues",
      body: "Discovered issues, vulnerabilities, bugs and technical problems are documented with evidence.",
    },
    {
      number: "05",
      title: "Report",
      body: "You receive a clear, structured report written for technical and business readers.",
    },
    {
      number: "06",
      title: "Remediation guidance",
      body: "We explain how each identified issue can be addressed, in priority order.",
    },
    {
      number: "07",
      title: "Retesting",
      body: "Where applicable, fixes are verified and the status of each finding is updated.",
    },
    {
      number: "08",
      title: "Ongoing maintenance",
      body: "Continued maintenance and periodic technical review keep the improvement going.",
    },
  ];

  const scrollTimeline = (direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 292;
    const scrollAmount = cardWidth + 16;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let intervalId: number | null = null;
    let resumeTimer: number | null = null;
    let isPaused = false;

    const tick = () => {
      if (isPaused || !container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) return;

      if (container.scrollLeft >= maxScroll - 1) {
        container.scrollLeft = 0;
        return;
      }

      container.scrollLeft += 0.6;
    };

    const startAutoScroll = () => {
      if (intervalId !== null) window.clearInterval(intervalId);
      intervalId = window.setInterval(tick, 18);
    };

    const pauseAutoScroll = () => {
      isPaused = true;
      if (resumeTimer !== null) window.clearTimeout(resumeTimer);
    };

    const resumeAutoScroll = () => {
      if (resumeTimer !== null) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        isPaused = false;
      }, 700);
    };

    const handleMouseEnter = () => pauseAutoScroll();
    const handleMouseLeave = () => resumeAutoScroll();
    const handlePointerDown = () => pauseAutoScroll();
    const handlePointerUp = () => resumeAutoScroll();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointerup", handlePointerUp);

    startAutoScroll();

    return () => {
      if (intervalId !== null) window.clearInterval(intervalId);
      if (resumeTimer !== null) window.clearTimeout(resumeTimer);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setPreviewTab((current) => {
        const tabs = ["website", "app", "ai", "video", "automation", "data"];
        const idx = tabs.indexOf(current);
        const nextIdx = idx >= 0 ? (idx + 1) % tabs.length : 0;
        return tabs[nextIdx] as string;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  return (
    <div>
      {/* Hero */}
      <section className="navy-panel grid-backdrop relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:py-28 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              {PROSPHERE_TAGLINE}
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-navy-foreground sm:text-5xl lg:text-6xl">
              Secure it.
              <span className="block">Test it.</span>
              <span className="block">Maintain it.</span>
              <span className="block text-violet">Then improve it.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-foreground/75">
              ProSphere is a technical services platform for websites, applications and digital
              products — helping you secure, test, maintain and improve what you build.
            </p>

            <form
              className="mt-8 flex flex-col gap-3 rounded-xl border border-[#363636] bg-[#111111] p-3 shadow-lift backdrop-blur-sm sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/services" });
              }}
            >
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#92928D]"
                  aria-hidden="true"
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Security assessment, website testing, bug fixing, performance..."
                  aria-label="Search ProSphere services"
                  className="h-12 border-0 bg-[#181818] pl-9 text-white shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-[#1769E0] text-white hover:bg-[#0F56BD]"
              >
                Explore Services
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[#C7C7C3]">
              <span>Popular:</span>
              {[
                { label: "Security assessment", to: "/website-security-assessment" },
                { label: "Website testing", to: "/services" },
                { label: "Performance", to: "/services" },
                { label: "Maintenance", to: "/services" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.to}
                  className="rounded-full border border-[#363636] px-3 py-1 transition-colors hover:border-[#1769E0] hover:text-[#1769E0]"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-[#363636] bg-[#181818] shadow-card">
              <div className="flex items-center justify-between border-b border-[#363636] px-5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#92928D]">
                  Digital Product Preview
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#E83E8C]/30 bg-[#E83E8C]/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E83E8C]">
                  Live Demo
                </span>
              </div>

              <div className="p-5">
                <div
                  className="flex flex-wrap items-center gap-2"
                  onMouseEnter={() => setAutoRotate(false)}
                  onMouseLeave={() => setAutoRotate(true)}
                >
                  {["website", "app", "ai", "video", "automation", "data"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => {
                        setPreviewTab(tab);
                        setAutoRotate(false);
                      }}
                      className="rounded-md border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors"
                      style={{
                        borderColor: previewTab === tab ? "#1769E0" : "#363636",
                        backgroundColor: previewTab === tab ? "#1769E0" : "transparent",
                        color: previewTab === tab ? "#FFFFFF" : "#C7C7C3",
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="relative mt-5 h-[420px] overflow-hidden rounded-xl border border-[#363636] bg-[#111111]">
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "website" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex h-full flex-col bg-[#F8F9FA]">
                      <div className="flex items-center gap-2 border-b border-[#E5E7EB] px-4 py-3">
                        <div className="flex gap-1.5">
                          <span className="size-2.5 rounded-full bg-[#D94A4A]" />
                          <span className="size-2.5 rounded-full bg-[#D9A62E]" />
                          <span className="size-2.5 rounded-full bg-[#4CCB91]" />
                        </div>
                        <span className="text-[10px] text-[#222222]">website.app</span>
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-base font-semibold text-[#FFFFFF]">
                          ProSphere Services
                        </h3>
                        <p className="mt-2 text-sm text-[#B8B8B8]">
                          Security, testing and maintenance for digital products.
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-xs font-semibold text-[#1769E0]">
                              Website Security
                            </div>
                            <p className="mt-2 text-xs text-[#B8B8B8]">
                              Assessment, testing and hardening guidance.
                            </p>
                            <p className="mt-1 text-xs text-[#A6A6A6]">
                              Evidence-backed reporting included.
                            </p>
                          </div>
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-xs font-semibold text-[#E83E8C]">
                              Application Testing
                            </div>
                            <p className="mt-2 text-xs text-[#B8B8B8]">
                              Functional, performance and regression coverage.
                            </p>
                            <p className="mt-1 text-xs text-[#A6A6A6]">
                              Clear reproduction steps and impact.
                            </p>
                          </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                          <div className="h-8 w-24 rounded-md bg-[#1769E0] text-center text-xs font-semibold text-white leading-8">
                            Get started
                          </div>
                          <div className="h-8 w-24 rounded-md border border-[#D1D5DB] bg-[#181818] text-center text-xs font-semibold text-[#B8B8B8] leading-8">
                            View services
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "app" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex h-full bg-[#111111]">
                      <div className="w-16 border-r border-[#363636] bg-[#111111] p-3">
                        <div className="space-y-3">
                          <div className="h-2 w-8 rounded bg-[#1769E0]" />
                          <div className="h-2 w-10 rounded bg-[#363636]" />
                          <div className="h-2 w-10 rounded bg-[#363636]" />
                          <div className="h-2 w-8 rounded bg-[#363636]" />
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-[10px] text-[#A6A6A6]">Users</div>
                            <div className="mt-2 text-lg font-semibold text-[#FFFFFF]">2,481</div>
                          </div>
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-[10px] text-[#A6A6A6]">Sessions</div>
                            <div className="mt-2 text-lg font-semibold text-[#FFFFFF]">18.4k</div>
                          </div>
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-[10px] text-[#A6A6A6]">Bounce</div>
                            <div className="mt-2 text-lg font-semibold text-[#FFFFFF]">24%</div>
                          </div>
                          <div className="rounded-lg border border-[#363636] bg-[#181818] p-4">
                            <div className="text-[10px] text-[#A6A6A6]">Revenue</div>
                            <div className="mt-2 text-lg font-semibold text-[#FFFFFF]">$48.2k</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "ai" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex h-full flex-col bg-[#111111] p-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="size-8 rounded-full bg-[#1769E0]/20 flex items-center justify-center text-[10px] font-bold text-[#1769E0]">
                            IN
                          </div>
                          <div className="rounded-xl border border-[#363636] bg-[#181818] p-3">
                            <div className="text-xs font-semibold text-[#FFFFFF]">
                              Prompt / Input
                            </div>
                            <p className="mt-1 text-[10px] text-[#B8B8B8]">
                              Describe what you want to create or automate.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="size-8 rounded-full bg-[#E83E8C]/20 flex items-center justify-center text-[10px] font-bold text-[#E83E8C]">
                            AI
                          </div>
                          <div className="rounded-xl border border-[#E83E8C]/20 bg-[#181818] p-3">
                            <div className="text-xs font-semibold text-[#FFFFFF]">
                              Model processing
                            </div>
                            <p className="mt-1 text-[10px] text-[#B8B8B8]">
                              Generating output from your request.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="size-8 rounded-full bg-[#1769E0]/20 flex items-center justify-center text-[10px] font-bold text-[#1769E0]">
                            OUT
                          </div>
                          <div className="rounded-xl border border-[#4CCB91]/30 bg-[#181818] p-3">
                            <div className="text-xs font-semibold text-[#FFFFFF]">
                              Content / Action
                            </div>
                            <p className="mt-1 text-[10px] text-[#B8B8B8]">
                              Ready to review or deploy.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "video" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="h-full overflow-y-auto bg-[#F8F9FA] p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { title: "ProSphere Ad", src: "/assets/Prosphere_ADS/ads.mp4" },
                          { title: "Nova Shoes", src: "/assets/Prosphere_ADS/nova_shoes_ads.mp4" },
                          { title: "Chair Ad", src: "/assets/Prosphere_ADS/chair_ads.mp4" },
                          { title: "Chair Ad 2", src: "/assets/Prosphere_ADS/chair2_ads.mp4" },
                          { title: "Coca-Cola", src: "/assets/Prosphere_ADS/cococola_ads.mp4" },
                          { title: "Ponds", src: "/assets/Prosphere_ADS/ponds_ADS.mp4" },
                          {
                            title: "Car Adventures",
                            src: "/assets/Prosphere_ADS/car_adventures_ads.mp4",
                          },
                          {
                            title: "Creative Intro",
                            src: "/assets/Prosphere_ADS/MM%20Introduction%20Creative%20Clip.mp4",
                          },
                          {
                            title: "DC Tech Intro",
                            src: "/assets/Prosphere_ADS/DC%20Technologies%20Introduction.mp4",
                          },
                          { title: "Skin 1", src: "/assets/skin_videos/1.mp4" },
                          { title: "Skin 2", src: "/assets/skin_videos/2.mp4" },
                          { title: "Skin 3", src: "/assets/skin_videos/3.mp4" },
                          { title: "Skin 4", src: "/assets/skin_videos/4.mp4" },
                          { title: "Skin 5", src: "/assets/skin_videos/5.mp4" },
                          { title: "Skin 6", src: "/assets/skin_videos/6.mp4" },
                          { title: "Skin 7", src: "/assets/skin_videos/7.mp4" },
                          { title: "Skin 8", src: "/assets/skin_videos/8.mp4" },
                        ].map((video) => (
                          <div
                            key={video.src}
                            className="relative aspect-video rounded-lg overflow-hidden bg-[#111111] border border-[#E5E7EB]"
                          >
                            <video
                              className="h-full w-full object-cover"
                              preload="metadata"
                              muted
                              loop
                              playsInline
                            >
                              <source src={video.src} type="video/mp4" />
                            </video>
                            <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
                              {video.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "automation" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex h-full flex-col items-center justify-center bg-[#F8F9FA] p-6">
                      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]">
                        <span className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#000000]">
                          Trigger
                        </span>
                        <span className="text-[#D1D5DB]">→</span>
                        <span className="rounded-lg border border-[#1769E0]/30 bg-[#1769E0]/10 px-4 py-2 text-[#1769E0]">
                          AI
                        </span>
                        <span className="text-[#D1D5DB]">→</span>
                        <span className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[#000000]">
                          Process
                        </span>
                        <span className="text-[#D1D5DB]">→</span>
                        <span className="rounded-lg border border-[#E83E8C]/30 bg-[#E83E8C]/10 px-4 py-2 text-[#E83E8C]">
                          Action
                        </span>
                      </div>
                      <div className="mt-8 flex items-center gap-2 text-[10px] text-[#222222]">
                        <span className="inline-block size-2 rounded-full bg-[#4CCB91]" />
                        Workflow running
                      </div>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${previewTab === "data" ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex h-full flex-col bg-[#F8F9FA] p-6">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                        <span className="text-xs font-semibold text-[#000000]">Business Data</span>
                        <span className="rounded-full border border-[#E5E7EB] bg-white px-2 py-0.5 text-[10px] text-[#222222]">
                          Report
                        </span>
                      </div>
                      <div className="mt-6 flex-1">
                        <div className="flex items-end justify-between gap-2">
                          {[35, 55, 40, 70, 60].map((height, idx) => (
                            <div
                              key={idx}
                              className={`flex-1 rounded-t-md ${idx % 2 === 0 ? "bg-[#1769E0]/70" : "bg-[#E83E8C]/60"}`}
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[10px] text-[#222222]">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="One platform. Two directions."
          title="ProSphere keeps digital products secure, tested and maintained."
          description="DigiCrystal Technologies helps design, build, automate and create them."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal
            as="article"
            className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[#363636] bg-[#181818] p-8 shadow-card"
          >
            <div>
              <div className="flex items-center justify-between">
                <img
                  src={brandAssets.globe}
                  alt="ProSphere"
                  className="size-11 object-contain"
                  width={44}
                  height={44}
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
                  ProSphere
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-white">
                Build • Secure • Test • Maintain • Improve
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#92928D]">
                {PROSPHERE_TAGLINE}
              </p>
            </div>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#C7C7C3]">
              Security, testing, maintenance and technical support — delivered with evidence-backed
              reporting and prioritised remediation guidance.
            </p>
            <Button asChild className="mt-8 self-start bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/services">
                Explore ProSphere <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>

          <Reveal
            as="article"
            delay={80}
            className="flex h-full flex-col justify-between rounded-[1.5rem] border border-[#363636] bg-[#181818] p-8 shadow-card"
          >
            <div>
              <div className="flex items-center justify-between">
                <img
                  src={brandAssets.digiCrystal}
                  alt="DigiCrystal"
                  className="size-11 object-contain"
                  width={44}
                  height={44}
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E83E8C]">
                  DigiCrystal
                </span>
              </div>
              <h3 className="mt-5 text-3xl font-bold text-white">
                AI • Create • Build • Automate • Transform
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#92928D]">
                {DIGICRYSTAL_TAGLINE}
              </p>
            </div>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#C7C7C3]">
              AI content, video and graphics, presentations, websites and applications, automation
              and data solutions.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 self-start border-[#E83E8C] text-[#E83E8C] hover:bg-[#E83E8C] hover:text-white"
            >
              <Link to="/digicrystal">
                Explore DigiCrystal <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <SecurityAssessmentWidget />

      {/* Categories */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
              What do you need?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Where should we start?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#C7C7C3]">
              Tell us what you are trying to achieve, and we&apos;ll point you in the right
              direction.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              {
                title: "I need to secure something",
                body: "Security assessments, vulnerability checks and hardening guidance.",
                to: "/services",
                accent: "#1769E0",
              },
              {
                title: "I need to test something",
                body: "Functional, performance, regression and compatibility testing.",
                to: "/services",
                accent: "#1769E0",
              },
              {
                title: "I need ongoing technical help",
                body: "Maintenance, updates, optimisation and health checks.",
                to: "/services",
                accent: "#E83E8C",
              },
              {
                title: "Something is broken or I'm stuck",
                body: "Troubleshooting, issue analysis and technical support.",
                to: "/services",
                accent: "#E83E8C",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="group flex items-center justify-between gap-4 rounded-lg border border-[#363636] bg-[#111111] px-5 py-4 transition-all duration-200 hover:border-[#1769E0]/60"
              >
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#92928D]">{item.body}</p>
                </div>
                <span className="shrink-0 text-base font-semibold text-[#1769E0] transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="SECURITY SERVICES"
          title="Security services, backed by evidence"
          description="From assessment and testing to remediation and maintenance — each service has a clear scope, deliverable and reporting outcome."
          action={
            <Button asChild variant="outline">
              <Link to="/services">View all services</Link>
            </Button>
          }
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {visibleServices.map((service, index) => (
            <Reveal key={service.id} delay={index * 50}>
              <Link
                to={service.href}
                className="group block h-full overflow-hidden rounded-[1.5rem] border border-[#363636] bg-[#181818] p-4 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-[#1769E0] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                <div className="grid gap-5 md:grid-cols-[1.05fr_1.35fr]">
                  <div className="min-h-[210px]">
                    <ServiceVisual type={service.visual} />
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1769E0]">
                        {prosphereCategories.find((category) => category.id === service.category)
                          ?.name ?? "Service"}
                      </div>
                      <h3 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#92928D]">
                        {service.summary}
                      </p>
                    </div>

                    <div className="mt-5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
                        What you receive
                      </div>
                      <p className="mt-2 text-sm font-medium text-[#C7C7C3]">{service.outcome}</p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#363636] pt-4">
                      <span className="text-sm font-medium text-[#C7C7C3]">{service.action}</span>
                      <span className="text-base font-semibold text-[#1769E0] transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="navy-panel py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            inverted
            eyebrow="PROCESS"
            title="How we work, from start to finish"
            description="From defining your needs to testing, reporting, fixing and ongoing support."
          />

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-end gap-3 text-lg text-[#C7C7C3]">
              <button
                type="button"
                onClick={() => scrollTimeline("prev")}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#363636] bg-[#181818] text-lg transition-colors hover:border-[#1769E0] hover:text-[#1769E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]/60"
                aria-label="Scroll process left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollTimeline("next")}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#363636] bg-[#181818] text-lg transition-colors hover:border-[#1769E0] hover:text-[#1769E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0]/60"
                aria-label="Scroll process right"
              >
                →
              </button>
            </div>

            <div
              ref={scrollRef}
              className="overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  scrollTimeline("next");
                }
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  scrollTimeline("prev");
                }
              }}
              aria-label="ProSphere process timeline"
            >
              <div className="flex min-w-max gap-4 md:gap-5 lg:gap-6">
                {processStages.map((stage) => (
                  <article
                    key={stage.number}
                    className="w-[260px] shrink-0 rounded-xl border border-[#363636] bg-[#181818] p-4 text-left shadow-sm sm:w-[280px] lg:w-[292px]"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className="text-sm font-bold tracking-[0.2em] text-[#1769E0]">
                      {stage.number}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-white">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#C7C7C3]">{stage.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-relaxed text-[#92928D]">
            Security testing is performed only with appropriate authorization and agreed scope.
          </p>
        </div>
      </section>

      {/* DigiCrystal showcase */}
      <section className="surface-band py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#E83E8C]">
                DIGICRYSTAL TECHNOLOGIES
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Create. Build. Automate.
              </h2>
            </div>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-[#C7C7C3] sm:text-base">
            From AI-powered UGC ads and digital content to websites, applications, video, graphics,
            presentations, automation and business solutions.
          </p>

          <DigiCrystalCarousel />

          <div className="mt-5">
            <Link
              to="/digicrystal"
              className="inline-flex items-center gap-2 text-base font-medium text-white transition-colors hover:text-[#E83E8C]"
            >
              Explore DigiCrystal Technologies <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
