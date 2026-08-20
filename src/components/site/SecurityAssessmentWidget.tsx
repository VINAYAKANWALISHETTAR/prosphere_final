import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

export function SecurityAssessmentWidget() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-[#D0D0D0] bg-[#F4F4F2] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#1769E0]" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
                Security Assessment
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#0A0A0A] sm:text-3xl">
              How secure is your website?
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#3F3F3F]">
              Run a quick security assessment to identify potential security risks, configuration
              issues and areas that may need improvement.
            </p>

            <p className="mt-2 text-sm text-[#6F6F6B]">No technical expertise required.</p>

            <div className="mt-6">
              <Link
                to="/website-security-assessment"
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0F56BD]"
                style={{
                  backgroundColor: "#1769E0",
                }}
              >
                Check Your Website Security
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
