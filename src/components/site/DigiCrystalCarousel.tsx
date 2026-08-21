import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause } from "lucide-react";

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
    preview: "/assets/Prosphere_ADS/ads_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "nova-shoes",
    title: "Nova Shoes Advertisement",
    category: "Video",
    src: "/assets/Prosphere_ADS/nova_shoes_ads.mp4",
    preview: "/assets/Prosphere_ADS/nova_shoes_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "chair-ad",
    title: "Chair Advertisement",
    category: "Video",
    src: "/assets/Prosphere_ADS/chair_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "chair2-ad",
    title: "Chair Advertisement 2",
    category: "Video",
    src: "/assets/Prosphere_ADS/chair2_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair2_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "coca-cola",
    title: "Coca-Cola Creative",
    category: "Design",
    src: "/assets/Prosphere_ADS/cococola_ads.mp4",
    preview: "/assets/Prosphere_ADS/cococola_t.mp4.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "ponds",
    title: "Ponds Creative",
    category: "Design",
    src: "/assets/Prosphere_ADS/ponds_ADS.mp4",
    preview: "/assets/Prosphere_ADS/ponds_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "car-adventures",
    title: "Car Adventures",
    category: "Video",
    src: "/assets/Prosphere_ADS/car_adventures_ads.mp4",
    preview: "/assets/Prosphere_ADS/car_adventure_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "mm-intro",
    title: "Creative Introduction",
    category: "Video",
    src: "/assets/Prosphere_ADS/MM%20Introduction%20Creative%20Clip.mp4",
    preview: "/assets/Prosphere_ADS/MM_introduction_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "dc-intro",
    title: "AI Creative",
    category: "AI",
    src: "/assets/Prosphere_ADS/DC%20Technologies%20Introduction.mp4",
    preview: "/assets/Prosphere_ADS/Dc_introduction_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "ai-ugc",
    title: "AI + UGC Ads for Brands",
    category: "Video",
    src: "/assets/Prosphere_ADS/AI%20+%20UGC%20Ads%20for%20Brands.mp4",
    preview: "/assets/Prosphere_ADS/AI%20+%20UGC%20Ads%20for%20Brands_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
];

export function DigiCrystalCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const [failedSlides, setFailedSlides] = useState<Set<string>>(new Set());
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});

  const visibleCount = 3;
  const maxIndex = Math.max(0, slides.length - visibleCount);

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

  useEffect(() => {
    if (!openVideoId) return;

    const card = trackRef.current?.querySelector(`[data-video-card-id="${openVideoId}"]`);
    if (!card) return;

    const video = card.querySelector("video");
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          setPlayingStates((prev) => ({ ...prev, [openVideoId]: false }));
          setMutedStates((prev) => ({ ...prev, [openVideoId]: true }));
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [openVideoId]);

  return (
    <div className="relative">
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
          {slides.map((item) => {
            const hasPreview =
              item.type === "video" && !!item.preview && !failedSlides.has(item.id);
            const isVideoOpen = openVideoId === item.id;

            if (hasPreview && isVideoOpen) {
              const isPlaying = playingStates[item.id] ?? false;

              return (
                <div
                  key={item.id}
                  data-video-card-id={item.id}
                  className="relative w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] shadow-card"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-[#0A0A0A]">
                    <video
                      className="h-full w-full object-cover"
                      preload="metadata"
                      muted={mutedStates[item.id] ?? true}
                      loop={false}
                      playsInline
                      autoPlay={false}
                      controls={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onEnded={() => setPlayingStates((prev) => ({ ...prev, [item.id]: false }))}
                      onError={() => handleVideoError(item.id)}
                    >
                      <source src={item.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const video = e.currentTarget
                            .closest(".relative")
                            ?.querySelector("video") as HTMLVideoElement | null;
                          if (!video) return;

                          if (video.paused) {
                            video
                              .play()
                              .then(() => {
                                setPlayingStates((prev) => ({ ...prev, [item.id]: true }));
                              })
                              .catch(() => {});
                          } else {
                            video.pause();
                            setPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                          }
                        }}
                        className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMuted(item.id);
                        }}
                        className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                        aria-label={(mutedStates[item.id] ?? true) ? "Unmute" : "Mute"}
                      >
                        {(mutedStates[item.id] ?? true) ? (
                          <VolumeX className="size-4" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-[#363636] px-5 py-3">
                    <p className="text-[10px] text-[#92928D]">Preview only — download disabled</p>
                  </div>
                </div>
              );
            }

            if (hasPreview) {
              return (
                <div
                  key={item.id}
                  className="group relative block w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-[#E83E8C] hover:shadow-[0_18px_40px_rgba(232,62,140,0.16)]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-[#0A0A0A]">
                    <img
                      src={item.preview}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenVideoId(item.id);
                        }}
                        className="rounded-md bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-black/90"
                      >
                        OPEN
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="flex w-[280px] shrink-0 items-center justify-center rounded-2xl border border-[#363636] bg-[#181818] shadow-card"
                style={{ scrollSnapAlign: "start", minHeight: 260 }}
              >
                <p className="text-[10px] text-[#92928D]">Preview not available</p>
              </div>
            );
          })}
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
