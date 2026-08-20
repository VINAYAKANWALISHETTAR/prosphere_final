import { Link } from "@tanstack/react-router";
import { brandAssets } from "@/lib/brand";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[#2A2A2A] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <img
                src={brandAssets.lockup}
                alt="ProSphere logo"
                className="h-9 w-auto object-contain"
                width={180}
                height={40}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A6A6A6]">
                ×
              </span>
              <img
                src={brandAssets.digiCrystal}
                alt="DigiCrystal logo"
                className="h-8 w-auto object-contain"
                width={160}
                height={32}
              />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A6A6A6]">
              Technical services for websites, applications and digital products — from security and
              testing to maintenance and technical support.
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A6A6A6]">
              Build • Secure • Test • Maintain • Improve
            </p>
          </div>

          <nav aria-label="ProSphere explore" className="text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6D6D6]">
              Explore
            </p>
            <ul className="mt-3 space-y-2.5 text-[#A6A6A6]">
              <li>
                <Link to="/" className="transition-colors hover:text-[#3D8BFF]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-[#3D8BFF]">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="transition-colors hover:text-[#3D8BFF]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/demo-center" className="transition-colors hover:text-[#3D8BFF]">
                  Demo Center
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#3D8BFF]">
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="ProSphere services" className="text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6D6D6]">
              Services
            </p>
            <ul className="mt-3 space-y-2.5 text-[#A6A6A6]">
              <li>
                <Link to="/services" className="transition-colors hover:text-[#3D8BFF]">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-[#3D8BFF]">
                  Testing
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-[#3D8BFF]">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-[#3D8BFF]">
                  Technical Support
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="ProSphere more" className="text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6D6D6]">
              More
            </p>
            <ul className="mt-3 space-y-2.5 text-[#A6A6A6]">
              <li>
                <Link
                  to="/digicrystal"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#FF4FA3]"
                >
                  DigiCrystal Technologies <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-1 transition-colors hover:text-[#3D8BFF]"
                >
                  Start a Project <span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="transition-colors hover:text-[#3D8BFF]">
                  Get Guidance
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#2A2A2A] pt-6">
          <p className="text-[11px] leading-relaxed text-[#A6A6A6]">
            Security testing is performed only on systems for which appropriate authorization has
            been provided.
          </p>

          <div className="mt-4 flex flex-col gap-3 text-xs text-[#A6A6A6] sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} ProSphere. All rights reserved.</p>
            <p aria-label="Legal links" className="flex items-center gap-2">
              <Link to="/privacy" className="transition-colors hover:text-[#3D8BFF]">
                Privacy
              </Link>
              <span aria-hidden="true" className="text-[#A6A6A6]">
                ·
              </span>
              <Link to="/terms" className="transition-colors hover:text-[#3D8BFF]">
                Terms
              </Link>
            </p>
          </div>

          <p className="mt-4 text-xs text-[#A6A6A6]">
            Founded & developed by{" "}
            <Link
              to="https://www.nayaka100.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#3D8BFF]"
            >
              Vinayaka N Walishettar
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
