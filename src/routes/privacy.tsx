import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ProSphere" },
      { name: "description", content: "ProSphere privacy policy and data handling information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-[#1769E0] hover:text-[#1769E0] hover:bg-[#1769E0]/10 -ml-2"
            >
              <ArrowLeft className="mr-2 size-4" />
              Back to Project Enquiry
            </Button>
          </div>
          <SectionHeading
            eyebrow="LEGAL"
            title="Privacy Policy"
            description="How ProSphere handles data, privacy and information across our services."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-[#C7C7C3]">
          <p>
            ProSphere is committed to protecting your privacy. This policy explains what data we
            collect, how we use it, and the choices you have.
          </p>
          <h3 className="text-lg font-semibold text-white">Information we collect</h3>
          <p>
            We collect information you provide directly, such as contact details, project
            requirements and communications. We may also collect usage data to improve service
            delivery.
          </p>
          <h3 className="text-lg font-semibold text-white">How we use information</h3>
          <p>
            Collected information is used to provide services, respond to enquiries, improve
            customer support and maintain operational security. We do not sell personal data.
          </p>
          <h3 className="text-lg font-semibold text-white">Data retention</h3>
          <p>
            We retain information only as long as necessary to deliver services, meet legal
            obligations and resolve disputes.
          </p>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p>
            For privacy-related questions, contact us through the ProSphere contact page or reach
            out directly via the contact details provided during engagement.
          </p>
        </div>
      </section>
    </div>
  );
}
