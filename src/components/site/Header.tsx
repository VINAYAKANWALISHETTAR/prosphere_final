import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { brandAssets } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const proNav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Demo Center", to: "/demo-center" },
  { label: "About", to: "/about" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onDigi = pathname.startsWith("/digicrystal");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-[#2A2A2A] bg-[#0A0A0A]/95 backdrop-blur-md"
          : "border-b border-transparent bg-[#0A0A0A]/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="ProSphere home">
          <img
            src={brandAssets.globe}
            alt=""
            aria-hidden="true"
            className="size-9 object-contain"
            width={36}
            height={36}
          />
          <span className="text-lg font-bold tracking-tight text-white">
            PRO<span className="text-[#1769E0]">SPHERE</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {proNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative text-sm font-medium transition-colors",
                isActive(item.to) ? "text-white" : "text-[#C7C7C3] hover:text-white",
              )}
            >
              {item.label}
              {isActive(item.to) && (
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] w-full",
                    onDigi ? "bg-[#E83E8C]" : "bg-[#1769E0]",
                  )}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <div className="flex items-center gap-1" role="group" aria-label="Brand switcher">
            <Link
              to="/"
              className={cn(
                "px-3 py-1.5 text-xs font-semibold transition-colors",
                !onDigi ? "text-[#1769E0]" : "text-[#92928D] hover:text-white",
              )}
            >
              ProSphere
            </Link>
            <span className="text-[#363636]">/</span>
            <Link
              to="/digicrystal"
              className={cn(
                "px-3 py-1.5 text-xs font-semibold transition-colors",
                onDigi ? "text-[#E83E8C]" : "text-[#92928D] hover:text-white",
              )}
            >
              DigiCrystal
            </Link>
          </div>
          <Button asChild size="sm" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/start-project">Start a Project →</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-md text-[#C7C7C3] transition-colors hover:text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-b border-[#2A2A2A] bg-[#0A0A0A] lg:hidden">
          <nav
            aria-label="Mobile"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {proNav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
                  isActive(item.to) ? "text-white" : "text-[#C7C7C3]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/digicrystal"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-[#E83E8C]"
            >
              DigiCrystal Technologies
            </Link>
            <Button asChild className="mt-2 bg-[#1769E0] text-white hover:bg-[#0F56BD]">
              <Link to="/start-project" onClick={() => setOpen(false)}>
                Start a Project →
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
