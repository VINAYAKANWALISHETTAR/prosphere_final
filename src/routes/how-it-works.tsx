import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";

const stages = [
  {
    id: "01",
    label: "Idea",
    title: "Start with your idea",
    heading: "01 — Start with your idea",
    body: "Tell us what you're trying to build, improve or solve.\n\nYou don't need a perfect technical brief. Start with what you know.",
  },
  {
    id: "02",
    label: "Understand",
    title: "Understand it",
    heading: "02 — Understand it",
    body: "We review your goal, requirements and existing situation so we can understand the actual problem and what the project needs.",
  },
  {
    id: "03",
    label: "Direction",
    title: "Define the direction",
    heading: "03 — Define the direction",
    body: "We establish the practical direction, scope, priorities and expected outcome before work begins.",
  },
  {
    id: "04",
    label: "Build",
    title: "Build",
    heading: "04 — Build",
    body: "We turn the agreed direction into the actual solution and develop the required components.",
  },
  {
    id: "05",
    label: "Refine",
    title: "Refine",
    heading: "05 — Refine",
    body: "We test, review and improve the result so the finished work is more reliable and useful.",
  },
  {
    id: "06",
    label: "Deliver",
    title: "Deliver",
    heading: "06 — Deliver",
    body: "We provide the completed work together with the relevant files, access, documentation or next steps.",
  },
];

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How ProSphere Works — Process and Approach" },
      {
        name: "description",
        content:
          "A clear six-stage process: idea, understanding, direction, build, refine and deliver.",
      },
      { property: "og:title", content: "How ProSphere Works — Process and Approach" },
      {
        property: "og:description",
        content: "From your first idea to the finished result, here's what the process looks like.",
      },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  const [activeStage, setActiveStage] = useState(stages[0]);

  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1769E0]">
            How ProSphere works
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            From your first idea to the finished result, here&apos;s what the process looks like.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(stage)}
              className={`rounded-xl border p-5 text-left transition-all duration-200 ${
                activeStage.id === stage.id
                  ? "border-[#1769E0] bg-[#1769E0]/10"
                  : "border-[#363636] bg-[#181818] hover:border-[#1769E0]/50"
              }`}
            >
              <span className="text-[11px] font-bold tracking-widest text-[#1769E0]">
                0{stage.id}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-white">{stage.title}</h3>
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#363636] bg-[#181818] p-8 sm:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
            {activeStage.heading}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#C7C7C3] whitespace-pre-line">
            {activeStage.body}
          </p>
        </div>
      </section>

      <section className="bg-[#111111] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Collaboration"
            title="A simple collaboration"
            description="You bring the idea and feedback. We handle the technical process from there."
          />

          <div className="mt-12">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <div className="mb-8">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1769E0]">
                    You
                  </span>
                  <p className="mt-2 text-sm text-[#C7C7C3]">You provide direction</p>
                </div>
                <ul className="space-y-5">
                  {["Your idea", "Your requirements", "Your feedback", "Your review"].map(
                    (item, i) => (
                      <li key={item} className="flex items-center gap-4 text-base text-[#C7C7C3]">
                        <span className="text-[#1769E0] font-bold text-lg w-8">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white font-medium">{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div>
                <div className="mb-8">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E83E8C]">
                    ProSphere
                  </span>
                  <p className="mt-2 text-sm text-[#C7C7C3]">We handle the build</p>
                </div>
                <ul className="space-y-5">
                  {["Understand", "Plan", "Build", "Refine", "Deliver"].map((item, i) => (
                    <li key={item} className="flex items-center gap-4 text-base text-[#C7C7C3]">
                      <span className="text-[#E83E8C] font-bold text-lg w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#363636] bg-[#181818] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Have an idea? Start there.
            </h2>
            <p className="mt-2 max-w-xl text-[#C7C7C3]">
              You don&apos;t need a complete brief. Tell us what you&apos;re trying to build, fix or
              improve.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-[#1769E0] text-white hover:bg-[#0F56BD] lg:mt-0"
          >
            <Link to="/start-project">Start a Project →</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
