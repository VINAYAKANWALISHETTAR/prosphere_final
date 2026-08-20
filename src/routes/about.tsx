import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { Fragment } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { brandAssets, PROSPHERE_TAGLINE, DIGICRYSTAL_TAGLINE } from "@/lib/brand";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ProSphere & DigiCrystal Technologies" },
      {
        name: "description",
        content:
          "ProSphere and DigiCrystal are two brands within the same digital ecosystem — one focused on technical reliability, the other on digital creation.",
      },
      { property: "og:title", content: "About ProSphere & DigiCrystal Technologies" },
      {
        property: "og:description",
        content:
          "Two connected brands: ProSphere for technical assurance, DigiCrystal for creative and technology-driven build work.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is ProSphere?",
      answer:
        "ProSphere is a digital services platform focused on the technical side of digital products — helping with reliability, security, testing, maintenance and ongoing improvement.",
    },
    {
      question: "What is DigiCrystal Technologies?",
      answer:
        "DigiCrystal Technologies is the creative and technology side of the ecosystem, focused on creating digital experiences, content, products and practical technology solutions.",
    },
    {
      question: "How are ProSphere and DigiCrystal connected?",
      answer:
        "They are separate brands within the same broader digital ecosystem. ProSphere focuses on technical reliability, while DigiCrystal focuses on creation and digital development.",
    },
    {
      question: "Is ProSphere an established large company?",
      answer:
        "ProSphere is currently being built independently and starts small. The focus is on developing practical capabilities, learning through real work and growing the platform carefully rather than presenting unsupported claims.",
    },
    {
      question: "Can I approach ProSphere if I am not sure what I need?",
      answer:
        "Yes. You do not need to have everything figured out before getting in touch. You can describe the problem, idea or goal and use the project enquiry process to provide the available context.",
    },
    {
      question: "Can students use the platform?",
      answer:
        "Yes. Students can submit project enquiries through the dedicated student option and provide only the information relevant to their academic project or requirements.",
    },
    {
      question: "Does ProSphere work with DigiCrystal on every project?",
      answer:
        "Not necessarily. The two brands have different roles, so the appropriate side of the ecosystem can be involved depending on the nature of the work.",
    },
    {
      question: "Where is ProSphere heading?",
      answer:
        "The long-term direction is to build a practical digital ecosystem where creation, technology and technical reliability can work together as digital products evolve.",
    },
  ];

  return (
    <div>
      <section className="navy-panel relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-24 lg:px-8">
          <Reveal as="div" delay={0}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92928D]">
              About ProSphere
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold text-white sm:text-5xl">
              Two brands. One digital ecosystem.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#C7C7C3]">
              ProSphere and DigiCrystal are two sides of the same platform — bringing technical
              reliability and digital creation together under one ecosystem.
            </p>
          </Reveal>

          <Reveal as="div" delay={100} className="flex items-center justify-center">
            <div className="flex w-full max-w-sm flex-col items-center gap-5">
              <div className="flex w-full items-center justify-between rounded-xl border border-[#363636] bg-[#181818] p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={brandAssets.globe}
                    alt="ProSphere logo"
                    className="h-10 w-10 object-contain"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">ProSphere</p>
                    <p className="text-xs text-[#92928D]">Secure • Test • Maintain</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="h-px w-8 bg-[#363636]" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
                  One Digital Ecosystem
                </p>
                <div className="h-px w-8 bg-[#363636]" aria-hidden="true" />
              </div>

              <div className="flex w-full items-center justify-between rounded-xl border border-[#363636] bg-[#181818] p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={brandAssets.digiCrystal}
                    alt="DigiCrystal logo"
                    className="h-10 w-10 object-contain"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">DigiCrystal</p>
                    <p className="text-xs text-[#92928D]">Create • Build • Automate</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal as="div" delay={0}>
          <SectionHeading
            eyebrow="The Two Sides"
            title="Two sides, different roles."
            description="Each brand has a distinct role, while both contribute to the same broader digital ecosystem."
            className="mb-10"
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal
            as="article"
            delay={0}
            className="rounded-xl border border-[#363636] bg-[#181818] p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
              The reliability side
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">ProSphere</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#92928D]">
              {PROSPHERE_TAGLINE}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#C7C7C3]">
              ProSphere is focused on the technical foundation behind digital products — helping
              them remain dependable as they are developed, used and maintained.
            </p>
            <Button asChild className="mt-6 bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/services">Explore ProSphere</Link>
            </Button>
          </Reveal>

          <Reveal
            as="article"
            delay={100}
            className="rounded-xl border border-[#363636] bg-[#181818] p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E83E8C]">
              The creation side
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">DigiCrystal Technologies</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#92928D]">
              {DIGICRYSTAL_TAGLINE}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#C7C7C3]">
              DigiCrystal is focused on turning ideas into digital experiences, creative work and
              practical technology.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 border-[#E83E8C] text-[#E83E8C] hover:bg-[#E83E8C] hover:text-white"
            >
              <Link to="/digicrystal">Explore DigiCrystal</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal as="div" delay={0}>
            <SectionHeading
              eyebrow="Why it exists"
              title="Digital work needs more than a launch."
              description={
                <span>
                  A digital product can start as an idea, become something people use, and continue
                  changing long after its first release. ProSphere exists to build an ecosystem
                  around that reality — connecting creation with the technical thinking needed to
                  keep digital work dependable over time.
                </span>
              }
              align="center"
              className="mx-auto max-w-3xl"
            />
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                label: "Build with purpose",
                text: "Start with the problem, not just the technology.",
              },
              {
                label: "Think beyond launch",
                text: "Digital work continues after the first version is released.",
              },
              {
                label: "Keep learning",
                text: "The platform grows through practical work, experimentation and iteration.",
              },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 80} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#92928D]">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal as="div" delay={0}>
          <SectionHeading
            eyebrow="Where we're starting"
            title="Built from the ground up."
            description={
              <span>
                ProSphere is being built independently, starting small and focusing on practical
                digital work, clear communication and a strong technical foundation.
                <br />
                <br />
                We are not presenting ourselves as a large established agency. The goal is to build
                the platform carefully, learn through real work and grow it step by step.
              </span>
            }
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <Reveal as="div" delay={100} className="mt-14">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
            {[
              { stage: "Today", label: "Independent" },
              { stage: "Building", label: "Products & capabilities" },
              { stage: "Learning", label: "Through practical work" },
              { stage: "Growing", label: "Step by step" },
            ].map((item, i) => (
              <div key={item.stage} className="flex items-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92928D]">
                    {item.stage}
                  </p>
                  <p className="mt-1 text-sm text-white">{item.label}</p>
                </div>
                {i < 3 && (
                  <Fragment key={`arrow-${i}`}>
                    <div className="hidden sm:flex flex-col items-center" aria-hidden="true">
                      <div className="h-8 w-px bg-[#363636]" />
                      <ChevronDown className="size-4 text-[#363636] -mt-1" />
                    </div>
                    <div className="sm:hidden h-px w-6 bg-[#363636]" aria-hidden="true" />
                  </Fragment>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal as="div" delay={0}>
            <SectionHeading
              eyebrow="The direction"
              title="A digital ecosystem that grows with the work."
              description={
                <span>
                  The long-term goal is to create a place where digital creation and technical
                  reliability can work together — from an early idea to the systems that support it
                  as it evolves.
                </span>
              }
              align="center"
              className="mx-auto max-w-3xl"
            />
          </Reveal>

          <Reveal as="div" delay={100} className="mt-14">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {["Create", "Build", "Support", "Improve"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 sm:gap-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                    {step}
                  </span>
                  {i < 3 && (
                    <span className="text-[#92928D]" aria-hidden="true">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M6 3l5 5-5 5" />
                      </svg>
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-[#1769E0] via-[#92928D] to-[#E83E8C] opacity-60" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal as="div" delay={0}>
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              “Good digital work should be useful today
              <br className="hidden sm:block" />
              and ready to evolve tomorrow.”
            </p>
            <footer className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#92928D]">
              ProSphere × DigiCrystal
            </footer>
          </blockquote>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal as="div" delay={0}>
          <SectionHeading
            eyebrow="FAQ"
            title="A few things you might be wondering."
            align="center"
            className="mx-auto max-w-3xl"
          />
        </Reveal>

        <div className="mt-10 divide-y divide-[#363636] rounded-xl border border-[#363636] bg-[#181818]">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors",
                    "hover:bg-[#1E1E1E]",
                    isOpen && "text-white",
                    !isOpen && "text-[#C7C7C3]",
                  )}
                >
                  <span className="text-sm font-medium sm:text-base">{faq.question}</span>
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border border-[#363636] transition-colors",
                      isOpen && "border-[#1769E0] text-[#1769E0]",
                      !isOpen && "text-[#92928D]",
                    )}
                    aria-hidden="true"
                  >
                    {isOpen ? <X className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#92928D]">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal as="div" delay={0}>
            <SectionHeading
              eyebrow="What's next"
              title="Have something worth building?"
              description={
                <span>
                  You don't need everything figured out before you start. Bring the idea, problem or
                  direction and we'll take it from there.
                </span>
              }
              align="center"
              className="mx-auto max-w-2xl"
            />
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/start-project">Start a Project</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#363636] bg-transparent text-white hover:bg-[#202020]"
            >
              <Link to="/">Explore the platform</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
