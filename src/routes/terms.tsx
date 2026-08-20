import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — ProSphere" },
      { name: "description", content: "ProSphere terms of service and usage conditions." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <section className="navy-panel">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="LEGAL"
            title="Terms"
            description="Terms and conditions for using ProSphere services and platforms."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6 text-sm leading-relaxed text-[#C7C7C3]">
          <p>
            These terms govern the use of ProSphere services, including assessments, testing,
            maintenance and support engagements.
          </p>
          <h3 className="text-lg font-semibold text-white">Authorisation</h3>
          <p>
            All security testing and technical assessments are performed only on systems for which
            appropriate authorization has been provided. Clients are responsible for ensuring that
            testing scope and access permissions are valid.
          </p>
          <h3 className="text-lg font-semibold text-white">Services</h3>
          <p>
            Services are provided on a best-effort basis. While we aim for accurate findings and
            clear reporting, results are based on the scope and information available at the time of
            engagement.
          </p>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p>
            For questions about these terms, contact ProSphere through the contact page or through
            the communication channels provided during project engagement.
          </p>
        </div>
      </section>
    </div>
  );
}
