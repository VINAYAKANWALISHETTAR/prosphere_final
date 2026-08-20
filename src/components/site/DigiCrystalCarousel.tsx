import { useRef, useState, useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";

import adSecurity from "@/assets/ad-security.jpg";
import adTesting from "@/assets/ad-testing.jpg";
import adMaintenance from "@/assets/ad-maintenance.jpg";
import adAutomation from "@/assets/ad-automation.jpg";

const slides = [
  {
    id: "ads-video",
    title: "Promotional Video",
    category: "Video",
    src: "/assets/Prosphere_ADS/ads.mp4",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "nova-shoes",
    title: "Nova Shoes Advertisement",
    category: "Video",
    src: "/assets/Prosphere_ADS/nova_shoes_ads.mp4",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "chair-ad",
    title: "Chair Advertisement",
    category: "Video",
    src: "/assets/Prosphere_ADS/chair_ads.mp4",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "chair2-ad",
    title: "Chair Advertisement 2",
    category: "Video",
    src: "/assets/Prosphere_ADS/chair2_ads.mp4",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "coca-cola",
    title: "Coca-Cola Creative",
    category: "Design",
    src: "/assets/Prosphere_ADS/cococola_ads.mp4",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "ponds",
    title: "Ponds Creative",
    category: "Design",
    src: "/assets/Prosphere_ADS/ponds_ADS.mp4",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "car-adventures",
    title: "Car Adventures",
    category: "Video",
    src: "/assets/Prosphere_ADS/car_adventures_ads.mp4",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "mm-intro",
    title: "Creative Introduction",
    category: "Video",
    src: "/assets/Prosphere_ADS/MM%20Introduction%20Creative%20Clip.mp4",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "dc-intro",
    title: "AI Creative",
    category: "AI",
    src: "/assets/Prosphere_ADS/DC%20Technologies%20Introduction.mp4",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "security",
    title: "Security Visual",
    category: "Design",
    src: adSecurity,
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "testing",
    title: "Testing Visual",
    category: "Design",
    src: adTesting,
    type: "image",
    accent: "#E83E8C",
  },
  {
    id: "maintenance",
    title: "Maintenance Visual",
    category: "Design",
    src: adMaintenance,
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "automation",
    title: "Automation Visual",
    category: "Automation",
    src: adAutomation,
    type: "image",
    accent: "#E83E8C",
  },
];

export function DigiCrystalCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const [isHovering, setIsHovering] = useState(false);
  const [failedSlides, setFailedSlides] = useState<Set<string>>(new Set());

  const visibleCount = 3;
  const maxIndex = Math.max(0, slides.length - visibleCount);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovering, maxIndex]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    const offset = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: offset, behavior: "smooth" });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    scrollToIndex(currentIndex > 0 ? currentIndex - 1 : maxIndex);
  };

  const handleNext = () => {
    scrollToIndex(currentIndex < maxIndex ? currentIndex + 1 : 0);
  };

  const toggleMuted = (id: string) => {
    setMutedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVideoError = (id: string) => {
    setFailedSlides((prev) => new Set(prev).add(id));
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#363636] bg-[#181818] text-lg transition-colors hover:border-[#E83E8C] hover:text-[#E83E8C]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#363636] bg-[#181818] text-lg transition-colors hover:border-[#E83E8C] hover:text-[#E83E8C]"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {slides.map((item) => (
            <Link
              key={item.id}
              to="/digicrystal"
              className="group relative block w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#E83E8C] hover:shadow-[0_18px_40px_rgba(232,62,140,0.16)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-[#0A0A0A]">
                {item.type === "video" && !failedSlides.has(item.id) ? (
                  <video
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted={mutedStates[item.id] ?? true}
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      e.currentTarget.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    onError={() => handleVideoError(item.id)}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[#92928D]">
                    Preview not available
                  </div>
                )}

                {item.type === "video" && !failedSlides.has(item.id) && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleMuted(item.id);
                    }}
                    className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    aria-label={(mutedStates[item.id] ?? true) ? "Unmute" : "Mute"}
                  >
                    {(mutedStates[item.id] ?? true) ? (
                      <VolumeX className="size-4" />
                    ) : (
                      <Volume2 className="size-4" />
                    )}
                  </button>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-3 bottom-0 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: item.accent }}
                  >
                    {item.category}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{item.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-[11px] text-[#92928D]">Preview only — download disabled</p>
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-[#E83E8C]" : "w-1.5 bg-[#363636] hover:bg-[#92928D]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
