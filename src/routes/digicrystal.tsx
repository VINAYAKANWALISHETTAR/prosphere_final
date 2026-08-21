import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Volume2, VolumeX, Play, Pause, X } from "lucide-react";
import { digicrystalDemos, digicrystalGroups } from "@/data/digicrystal";
import { brandAssets, DIGICRYSTAL_TAGLINE } from "@/lib/brand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import adSecurity from "@/assets/ad-security.jpg";
import adTesting from "@/assets/ad-testing.jpg";
import adMaintenance from "@/assets/ad-maintenance.jpg";
import adAutomation from "@/assets/ad-automation.jpg";

export const Route = createFileRoute("/digicrystal")({
  head: () => ({
    meta: [
      { title: "DigiCrystal Technologies — AI, Creative, Development & Automation" },
      {
        name: "description",
        content:
          "DigiCrystal Technologies delivers AI content, video and graphics, websites and applications, n8n automation and business data solutions.",
      },
      {
        property: "og:title",
        content: "DigiCrystal Technologies — AI, Creative, Development & Automation",
      },
      {
        property: "og:description",
        content:
          "Creative production, AI workflows, web and app development, and automation — the build side of the ProSphere platform.",
      },
    ],
  }),
  component: DigiCrystalPage,
});

const categories = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "design", label: "Design" },
  { id: "websites", label: "Websites" },
  { id: "ai", label: "AI" },
  { id: "automation", label: "Automation" },
  { id: "data", label: "Data" },
  { id: "presentations", label: "Presentations" },
];

const showcaseItems = [
  {
    id: "ads-video",
    title: "Promotional Video",
    category: "video",
    src: "/assets/Prosphere_ADS/ads.mp4",
    preview: "/assets/Prosphere_ADS/ads_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "nova-shoes",
    title: "Nova Shoes Advertisement",
    category: "video",
    src: "/assets/Prosphere_ADS/nova_shoes_ads.mp4",
    preview: "/assets/Prosphere_ADS/nova_shoes_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "chair-ad",
    title: "Chair Advertisement",
    category: "video",
    src: "/assets/Prosphere_ADS/chair_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "chair2-ad",
    title: "Chair Advertisement 2",
    category: "video",
    src: "/assets/Prosphere_ADS/chair2_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair2_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "coca-cola",
    title: "Coca-Cola Creative",
    category: "design",
    src: "/assets/Prosphere_ADS/cococola_ads.mp4",
    preview: "/assets/Prosphere_ADS/cococola_t.mp4.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "ponds",
    title: "Ponds Creative",
    category: "design",
    src: "/assets/Prosphere_ADS/ponds_ADS.mp4",
    preview: "/assets/Prosphere_ADS/ponds_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "car-adventures",
    title: "Car Adventures",
    category: "video",
    src: "/assets/Prosphere_ADS/car_adventures_ads.mp4",
    preview: "/assets/Prosphere_ADS/car_adventure_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "mm-intro",
    title: "Creative Introduction",
    category: "video",
    src: "/assets/Prosphere_ADS/MM%20Introduction%20Creative%20Clip.mp4",
    preview: "/assets/Prosphere_ADS/MM_introduction_t.jpeg",
    type: "video",
    accent: "#E83E8C",
  },
  {
    id: "dc-intro",
    title: "AI Creative",
    category: "ai",
    src: "/assets/Prosphere_ADS/DC%20Technologies%20Introduction.mp4",
    preview: "/assets/Prosphere_ADS/Dc_introduction_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "ai-ugc",
    title: "AI + UGC Ads for Brands",
    category: "video",
    src: "/assets/Prosphere_ADS/AI%20+%20UGC%20Ads%20for%20Brands.mp4",
    preview: "/assets/Prosphere_ADS/AI%20+%20UGC%20Ads%20for%20Brands_t.jpeg",
    type: "video",
    accent: "#1769E0",
  },
  {
    id: "social-campaign",
    title: "Social Media Campaign",
    category: "design",
    src: adSecurity,
    type: "image",
    images: [adSecurity, adTesting, adMaintenance, adAutomation],
    accent: "#1769E0",
  },
  {
    id: "workflow-1",
    title: "Basic Flowchart",
    category: "automation",
    src: "/assets/workflow/01_Basic_Flowchart.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-2",
    title: "Customer Onboarding",
    category: "automation",
    src: "/assets/workflow/01_Customer_Onboarding_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-3",
    title: "Content Creation",
    category: "automation",
    src: "/assets/workflow/02_Content_Creation_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-4",
    title: "Swimlane",
    category: "automation",
    src: "/assets/workflow/02_Swimlane.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-5",
    title: "Circular Workflow",
    category: "automation",
    src: "/assets/workflow/03_Circular_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-6",
    title: "Data Pipeline",
    category: "automation",
    src: "/assets/workflow/03_Data_Pipeline_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-7",
    title: "Kanban Workflow",
    category: "automation",
    src: "/assets/workflow/04_Kanban_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-8",
    title: "Support Ticket",
    category: "automation",
    src: "/assets/workflow/04_Support_Ticket_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-9",
    title: "Automation Workflow",
    category: "automation",
    src: "/assets/workflow/05_Automation_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-10",
    title: "Mind Map",
    category: "automation",
    src: "/assets/workflow/06_Mind_Map_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-11",
    title: "Timeline",
    category: "automation",
    src: "/assets/workflow/07_Timeline_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
  {
    id: "workflow-12",
    title: "BPMN",
    category: "automation",
    src: "/assets/workflow/08_BPMN_Workflow.png",
    type: "image",
    accent: "#1769E0",
  },
];

function MediaPreview({ item }: { item: (typeof showcaseItems)[number] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const mountedRef = useRef(true);
  const imageIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [item.src]);

  useEffect(() => {
    if (item.type === "image" && isHovered && item.images && item.images.length > 1) {
      let index = 0;
      imageIntervalRef.current = window.setInterval(() => {
        index = (index + 1) % item.images!.length;
        setCurrentImageIndex(index);
      }, 1200);
    }
    return () => {
      if (imageIntervalRef.current !== null) {
        window.clearInterval(imageIntervalRef.current);
        imageIntervalRef.current = null;
      }
    };
  }, [isHovered, item.type, item.images]);

  useEffect(() => {
    return () => {
      if (imageIntervalRef.current !== null) {
        window.clearInterval(imageIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          if (mountedRef.current) {
            setIsPlaying(false);
            setMuted(true);
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isVideoOpen]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isEnded) {
      video.currentTime = 0;
      setIsEnded(false);
    }

    if (video.paused) {
      video.play().then(() => {
        if (mountedRef.current) setIsPlaying(true);
      }).catch(() => {
        if (mountedRef.current) setIsPlaying(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video || !isVideoOpen) return;
    video.play().then(() => {
      if (mountedRef.current) setIsPlaying(true);
    }).catch(() => {
      if (mountedRef.current) setIsPlaying(false);
    });
  };

  const isProsphereAdVideo = item.type === "video" && !!item.preview;

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col rounded-xl border border-[#363636] bg-[#181818] p-4 transition-all duration-200 hover:border-[#0A0A0A]/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (item.type === "image") setCurrentImageIndex(0);
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: item.accent }}
        >
          {item.category}
        </span>
      </div>
      <div
        className="mt-3 flex-1 overflow-hidden rounded-lg border border-[#363636] bg-[#0A0A0A]"
        style={{ minHeight: 220 }}
      >
        {isProsphereAdVideo && !isVideoOpen ? (
          <div className="relative h-full w-full">
            <img
              src={item.preview}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoOpen(true);
                }}
                className="rounded-md bg-black/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-black/90"
              >
                OPEN
              </button>
            </div>
          </div>
        ) : item.type === "video" && !videoError && !isProsphereAdVideo ? (
          <div className="relative h-full w-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              preload="metadata"
              muted={muted}
              loop={false}
              playsInline
              onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
              }}
              onError={handleVideoError}
            >
              <source src={item.src} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMuted();
              }}
              className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        ) : item.type === "video" && isProsphereAdVideo && isVideoOpen ? (
          <div className="relative h-full w-full">
            {videoError ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#0A0A0A]">
                <p className="text-[10px] text-[#92928D]">Video couldn't be loaded.</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVideoError(false)}
                    className="rounded-md bg-[#1769E0] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
                  >
                    Try Again
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRef.current;
                      if (video) {
                        video.pause();
                      }
                      setIsVideoOpen(false);
                      setVideoError(false);
                      setIsPlaying(false);
                      setIsEnded(false);
                    }}
                    className="rounded-md border border-[#363636] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C7C7C3]"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  preload="metadata"
                  muted={muted}
                  loop={false}
                  playsInline
                  autoPlay={false}
                  controls={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onEnded={handleEnded}
                  onError={handleVideoError}
                  onLoadedData={handleLoadedData}
                >
                  <source src={item.src} type="video/mp4" />
                </video>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
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
                      toggleMuted();
                    }}
                    className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRef.current;
                      if (video) {
                        video.pause();
                      }
                      setIsVideoOpen(false);
                      setIsPlaying(false);
                      setIsEnded(false);
                    }}
                    className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : item.type === "video" && videoError ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[10px] text-[#92928D]">Preview not available</p>
          </div>
        ) : null}

        {item.type === "pdf" && (
          <iframe
            src={item.src}
            title={item.title}
            className="h-full w-full"
            style={{ minHeight: 220 }}
          />
        )}

        {item.type === "image" && item.images && (
          <div className="relative h-full w-full">
            {item.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt={`${item.title} preview ${idx + 1}`}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                style={{
                  opacity: idx === currentImageIndex ? 1 : 0,
                }}
                loading="lazy"
              />
            ))}
            <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm">
              {isHovered ? "Previewing" : "Hover to preview"}
            </div>
          </div>
        )}

        {item.type === "image" && !item.images && item.src && (
          <div className="relative h-full w-full">
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-[11px] text-[#92928D]">Preview only — download disabled</p>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: item.accent }}
        >
          {item.category}
        </span>
      </div>
    </div>
  );
}

function DigiCrystalPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showExtra, setShowExtra] = useState(false);
  const [showWorkflowExtra, setShowWorkflowExtra] = useState(false);
  const [showThumbnailsExtra, setShowThumbnailsExtra] = useState(false);
  const [showCreativeExtra, setShowCreativeExtra] = useState(false);
  const [dbWorkflowItems, setDbWorkflowItems] = useState<
    Array<{ id: string; title: string; src: string }>
  >([]);
  const [dbThumbnailItems, setDbThumbnailItems] = useState<
    Array<{ id: string; title: string; src: string }>
  >([]);
  const [dbExtraItems, setDbExtraItems] = useState<
    Array<{ id: string; title: string; src: string }>
  >([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [openExtraId, setOpenExtraId] = useState<string | null>(null);
  const [extraPlayingStates, setExtraPlayingStates] = useState<Record<string, boolean>>({});
  const [extraEndedStates, setExtraEndedStates] = useState<Record<string, boolean>>({});
  const [extraMutedValues, setExtraMutedValues] = useState<Record<string, boolean>>({});
  const [extraErrorStates, setExtraErrorStates] = useState<Record<string, boolean>>({});

  const filteredItems =
    activeCategory === "all"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeCategory);

  const getSkinPreview = (src: string) => {
    if (src.endsWith(".mp4")) {
      return src.replace(/\.mp4$/i, "_t.jpeg");
    }
    return src;
  };

  useEffect(() => {
    fetchContentItems();
  }, []);

  const fetchContentItems = async () => {
    try {
      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("is_active", true)
        .order("section", { ascending: true })
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Failed to fetch content items:", error);
        return;
      }

      if (data) {
        const workflow = data
          .filter((item) => item.section === "workflow")
          .map((item) => ({
            id: item.id,
            title: item.title,
            src: item.src,
          }));
        const thumbnails = data
          .filter((item) => item.section === "thumbnails")
          .map((item) => ({
            id: item.id,
            title: item.title,
            src: item.src,
          }));
        const extra = data
          .filter((item) => item.section === "extra")
          .map((item) => ({
            id: item.id,
            title: item.title,
            src: item.src,
          }));

        setDbWorkflowItems(workflow);
        setDbThumbnailItems(thumbnails);
        setDbExtraItems(extra);
      }
    } catch (err) {
      console.error("Error fetching content items:", err);
    } finally {
      setContentLoading(false);
    }
  };

  const workflowItems = (() => {
    const defaultItems = [
      {
        id: "workflow-1",
        title: "Basic Flowchart",
        src: "/assets/workflow/01_Basic_Flowchart.png",
      },
      {
        id: "workflow-2",
        title: "Customer Onboarding",
        src: "/assets/workflow/01_Customer_Onboarding_Workflow.png",
      },
      {
        id: "workflow-3",
        title: "Content Creation",
        src: "/assets/workflow/02_Content_Creation_Workflow.png",
      },
      { id: "workflow-4", title: "Swimlane", src: "/assets/workflow/02_Swimlane.png" },
      {
        id: "workflow-5",
        title: "Circular Workflow",
        src: "/assets/workflow/03_Circular_Workflow.png",
      },
      {
        id: "workflow-6",
        title: "Data Pipeline",
        src: "/assets/workflow/03_Data_Pipeline_Workflow.png",
      },
      {
        id: "workflow-7",
        title: "Kanban Workflow",
        src: "/assets/workflow/04_Kanban_Workflow.png",
      },
      {
        id: "workflow-8",
        title: "Support Ticket",
        src: "/assets/workflow/04_Support_Ticket_Workflow.png",
      },
      {
        id: "workflow-9",
        title: "Automation Workflow",
        src: "/assets/workflow/05_Automation_Workflow.png",
      },
      { id: "workflow-10", title: "Mind Map", src: "/assets/workflow/06_Mind_Map_Workflow.png" },
      { id: "workflow-11", title: "Timeline", src: "/assets/workflow/07_Timeline_Workflow.png" },
      { id: "workflow-12", title: "BPMN", src: "/assets/workflow/08_BPMN_Workflow.png" },
    ];
    if (dbWorkflowItems.length === 0) return defaultItems;
    const existingSrcs = new Set(dbWorkflowItems.map((item) => item.src));
    const fallback = defaultItems.filter((item) => !existingSrcs.has(item.src));
    return [...dbWorkflowItems, ...fallback];
  })();

  const thumbnailItems = (() => {
    const defaultItems = [
      {
        id: "thumb-1",
        title: "Global Discovery",
        src: "/assets/thumbniles/PRO_SPHERE_01_Global_Discovery.png",
      },
      {
        id: "thumb-2",
        title: "Search Discover",
        src: "/assets/thumbniles/PRO_SPHERE_02_Search_Discover.png",
      },
      {
        id: "thumb-3",
        title: "Search Discover Alt",
        src: "/assets/thumbniles/PRO_SPHERE_02_Search_Discover (1).png",
      },
      { id: "thumb-4", title: "My World", src: "/assets/thumbniles/PRO_SPHERE_03_My_World.png" },
      {
        id: "thumb-5",
        title: "Memories Travel",
        src: "/assets/thumbniles/PRO_SPHERE_04_Memories_Travel.png",
      },
      { id: "thumb-6", title: "Thumbnail 1", src: "/assets/thumbniles/tu1.png" },
      { id: "thumb-7", title: "Thumbnail 2", src: "/assets/thumbniles/tu2.png" },
    ];
    if (dbThumbnailItems.length === 0) return defaultItems;
    const existingSrcs = new Set(dbThumbnailItems.map((item) => item.src));
    const fallback = defaultItems.filter((item) => !existingSrcs.has(item.src));
    return [...dbThumbnailItems, ...fallback];
  })();

  return (
    <div>
      {/* Header */}
      <section className="navy-panel overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
                Creative Technology
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Create. Automate. Transform.
              </h1>
              <p className="mt-4 text-xl font-semibold text-[#E83E8C]">DigiCrystal Technologies</p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-[#92928D]">
                AI • Video • Design • Websites • Automation • Data
              </p>
              <div className="mt-8 flex flex-col gap-4">
                <Button asChild size="lg" className="bg-[#E83E8C] text-white hover:bg-[#C92E75]">
                  <Link to="/start-project" search={{ service: undefined, brand: "digicrystal" }}>
                    Start a DigiCrystal Project{" "}
                    <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <p className="text-sm text-[#92928D]">
                  Have an idea but don&apos;t know where to start?{" "}
                  <Link
                    to="/start-project"
                    search={{ service: undefined, brand: "digicrystal" }}
                    className="text-[#E83E8C] underline underline-offset-4 transition-colors hover:text-[#C92E75]"
                  >
                    Tell us what you&apos;re thinking →
                  </Link>
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 animate-pulse rounded-full bg-gradient-to-r from-[#1769E0]/20 to-[#E83E8C]/20 blur-[60px]" />
                <img
                  src="/assets/digi_crystal_logo.jpeg"
                  alt="DigiCrystal Technologies"
                  className="relative z-10 h-auto w-full max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Showcase */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Creative Showcase"
          title="See what DigiCrystal can create"
          description="Explore real previews of videos, designs, websites, AI experiences, automation and business solutions."
        />

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-md border px-4 py-1.5 text-xs font-medium transition-colors"
              style={{
                borderColor: activeCategory === cat.id ? "#1769E0" : "#363636",
                backgroundColor: activeCategory === cat.id ? "#1769E0" : "transparent",
                color: activeCategory === cat.id ? "#FFFFFF" : "#C7C7C3",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Showcase Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showCreativeExtra ? filteredItems : filteredItems.slice(0, 3)).map((item) => (
            <MediaPreview key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length > 3 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="sm"
              className="border-[#363636] text-[#C7C7C3] hover:bg-[#202020]"
              onClick={() => setShowCreativeExtra((prev) => !prev)}
            >
              {showCreativeExtra ? "Hide Extra ↑" : "View Extra →"}
            </Button>
          </div>
        )}

        {filteredItems.length === 0 && (
          <p className="mt-10 text-center text-sm text-[#92928D]">No items in this category yet.</p>
        )}
      </section>

      {/* Presentations Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Presentations"
          title="Poster & Presentation Design"
          description="Presentation slides, posters and visual assets created for campaigns, product launches and events."
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MediaPreview
            item={{
              id: "fashion-poster",
              title: "Presentation Design",
              category: "presentations",
              src: "/assets/Prosphere_ADS/pro_sphere_fasion%20poster.pdf",
              type: "pdf",
              accent: "#E83E8C",
            }}
          />
        </div>
      </section>

      {/* Automation Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1769E0]">
              AUTOMATION
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Automation
            </h2>
            <p className="mt-2 text-sm text-[#C7C7C3]">
              Process flows, automation diagrams and workflow designs.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#363636] text-[#C7C7C3] hover:bg-[#202020]"
            onClick={() => setShowWorkflowExtra((prev) => !prev)}
          >
            {showWorkflowExtra ? "Hide Extra ↑" : "View Extra →"}
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showWorkflowExtra ? workflowItems : workflowItems.slice(0, 3)).map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-[#363636] bg-[#181818]"
            >
              <div className="flex items-center justify-between border-b border-[#363636] px-5 py-3">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1769E0]">
                  Automation
                </span>
              </div>
              <div className="p-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full rounded-xl object-contain"
                  style={{ minHeight: 180 }}
                  loading="lazy"
                />
              </div>
              <div className="border-t border-[#363636] px-5 py-3">
                <p className="text-[11px] text-[#92928D]">Preview only — download disabled</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Thumbnails Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#E83E8C]">
              Thumbnails
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Thumbnail Designs
            </h2>
            <p className="mt-2 text-sm text-[#C7C7C3]">
              Custom thumbnails and ad visuals for content and campaigns.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#363636] text-[#C7C7C3] hover:bg-[#202020]"
            onClick={() => setShowThumbnailsExtra((prev) => !prev)}
          >
            {showThumbnailsExtra ? "Hide Extra ↑" : "View Extra →"}
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(showThumbnailsExtra ? thumbnailItems : thumbnailItems.slice(0, 3)).map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-[#363636] bg-[#181818]"
            >
              <div className="flex items-center justify-between border-b border-[#363636] px-5 py-3">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E83E8C]">
                  Thumbnail
                </span>
              </div>
              <div className="p-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full rounded-xl object-contain"
                  style={{ minHeight: 180 }}
                  loading="lazy"
                />
              </div>
              <div className="border-t border-[#363636] px-5 py-3">
                <p className="text-[11px] text-[#92928D]">Preview only — download disabled</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Videos */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#E83E8C]">
              EXTRA
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Skin Care & More
            </h2>
            <p className="mt-2 text-sm text-[#C7C7C3]">
              Additional video work from the extra collection.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#363636] text-[#C7C7C3] hover:bg-[#202020]"
            onClick={() => setShowExtra((prev) => !prev)}
          >
            {showExtra ? "Hide Extra ↑" : "View Extra →"}
          </Button>
        </div>

        {showExtra && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
             {(() => {
               const defaultItems = [
                 {
                   id: "extra-1",
                   title: "Skin Care Video 1",
                   category: "Skin Care",
                   src: "/assets/skin_videos/1.mp4",
                   preview: "/assets/skin_videos/1_t.jpeg",
                 },
                 {
                   id: "extra-2",
                   title: "Skin Care Video 2",
                   category: "Skin Care",
                   src: "/assets/skin_videos/2.mp4",
                   preview: "/assets/skin_videos/2_t.jpeg",
                 },
                 {
                   id: "extra-3",
                   title: "Skin Care Video 3",
                   category: "Skin Care",
                   src: "/assets/skin_videos/3.mp4",
                   preview: "/assets/skin_videos/3_t.jpeg",
                 },
                 {
                   id: "extra-4",
                   title: "Skin Care Video 4",
                   category: "Skin Care",
                   src: "/assets/skin_videos/4.mp4",
                   preview: "/assets/skin_videos/4_t.jpeg",
                 },
                 {
                   id: "extra-5",
                   title: "Skin Care Video 5",
                   category: "Skin Care",
                   src: "/assets/skin_videos/5.mp4",
                   preview: "/assets/skin_videos/5_t.jpeg",
                 },
                 {
                   id: "extra-6",
                   title: "Skin Care Video 6",
                   category: "Skin Care",
                   src: "/assets/skin_videos/6.mp4",
                   preview: "/assets/skin_videos/6_t.jpeg",
                 },
                 {
                   id: "extra-7",
                   title: "Skin Care Video 7",
                   category: "Skin Care",
                   src: "/assets/skin_videos/7.mp4",
                   preview: "/assets/skin_videos/7_t.jpeg",
                 },
                 {
                   id: "extra-8",
                   title: "Skin Care Video 8",
                   category: "Skin Care",
                   src: "/assets/skin_videos/8.mp4",
                   preview: "/assets/skin_videos/8_t.jpeg",
                 },
               ];
               if (dbExtraItems.length === 0) return defaultItems;
               const existingSrcs = new Set(dbExtraItems.map((item) => item.src));
               const fallback = defaultItems.filter((item) => !existingSrcs.has(item.src));
               return [
                 ...dbExtraItems.map((item) => ({
                   ...item,
                   preview: getSkinPreview(item.src),
                   category: item.category || "Extra",
                 })),
                 ...fallback,
               ];
             })().map((item) => {
               const isOpen = openExtraId === item.id;
               const isPlaying = extraPlayingStates[item.id] ?? false;
               const isEnded = extraEndedStates[item.id] ?? false;
               const isMuted = extraMutedValues[item.id] ?? true;
               const hasError = extraErrorStates[item.id] ?? false;

               const toggleExtraPlay = () => {
                 const video = document.querySelector(`[data-extra-video-id="${item.id}"] video`) as HTMLVideoElement | null;
                 if (!video) return;

                 if (isEnded) {
                   video.currentTime = 0;
                   setExtraEndedStates((prev) => ({ ...prev, [item.id]: false }));
                 }

                 if (video.paused) {
                   video.play().then(() => {
                     setExtraPlayingStates((prev) => ({ ...prev, [item.id]: true }));
                   }).catch(() => {
                     setExtraPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                   });
                 } else {
                   video.pause();
                   setExtraPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                 }
               };

               const toggleExtraMute = () => {
                 setExtraMutedValues((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
               };

               const handleExtraEnded = () => {
                 setExtraPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                 setExtraEndedStates((prev) => ({ ...prev, [item.id]: true }));
               };

               const handleExtraLoadedData = () => {
                 const video = document.querySelector(`[data-extra-video-id="${item.id}"] video`) as HTMLVideoElement | null;
                 if (!video || !isOpen) return;
                 video.play().then(() => {
                   setExtraPlayingStates((prev) => ({ ...prev, [item.id]: true }));
                 }).catch(() => {
                   setExtraPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                 });
               };

               const closeExtra = () => {
                 const video = document.querySelector(`[data-extra-video-id="${item.id}"] video`) as HTMLVideoElement | null;
                 if (video) video.pause();
                 setOpenExtraId(null);
                 setExtraPlayingStates((prev) => ({ ...prev, [item.id]: false }));
                 setExtraEndedStates((prev) => ({ ...prev, [item.id]: false }));
               };

               return (
                 <div
                   key={item.id}
                   data-extra-video-id={item.id}
                   className="flex h-full flex-col rounded-xl border border-[#363636] bg-[#181818] p-4 transition-all duration-200 hover:border-[#1769E0]"
                 >
                   <div className="flex items-center justify-between">
                     <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                     <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E83E8C]">
                       {item.category || "Extra"}
                     </span>
                   </div>
                   <div
                     className="relative mt-3 flex-1 overflow-hidden rounded-lg border border-[#363636] bg-[#0A0A0A]"
                     style={{ minHeight: 180 }}
                   >
                     {isOpen ? (
                       hasError ? (
                         <div className="flex h-full w-full flex-col items-center justify-center gap-3">
                           <p className="text-[10px] text-[#92928D]">Video couldn't be loaded.</p>
                           <div className="flex gap-2">
                             <button
                               type="button"
                               onClick={() => setExtraErrorStates((prev) => ({ ...prev, [item.id]: false }))}
                               className="rounded-md bg-[#1769E0] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white"
                             >
                               Try Again
                             </button>
                             <button
                               type="button"
                               onClick={closeExtra}
                               className="rounded-md border border-[#363636] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C7C7C3]"
                             >
                               Close
                             </button>
                           </div>
                         </div>
                       ) : (
                         <>
                           <video
                             className="h-full w-full object-cover"
                             preload="metadata"
                             muted={isMuted}
                             loop={false}
                             playsInline
                             autoPlay={false}
                             controls={false}
                             onContextMenu={(e) => e.preventDefault()}
                             onEnded={handleExtraEnded}
                             onError={() => setExtraErrorStates((prev) => ({ ...prev, [item.id]: true }))}
                             onLoadedData={handleExtraLoadedData}
                           >
                             <source src={item.src} type="video/mp4" />
                           </video>
                           <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-2">
                             <button
                               type="button"
                               onClick={toggleExtraPlay}
                               className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                               aria-label={isPlaying ? "Pause" : "Play"}
                             >
                               {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                             </button>
                             <button
                               type="button"
                               onClick={toggleExtraMute}
                               className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                               aria-label={isMuted ? "Unmute" : "Mute"}
                             >
                               {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                             </button>
                             <button
                               type="button"
                               onClick={closeExtra}
                               className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                               aria-label="Close"
                             >
                               <X className="size-4" />
                             </button>
                           </div>
                         </>
                       )
                     ) : (
                       <>
                         <img
                           src={item.preview}
                           alt={item.title}
                           className="h-full w-full object-cover"
                           loading="lazy"
                           decoding="async"
                         />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                           <button
                             type="button"
                             onClick={() => {
                               setOpenExtraId(item.id);
                               setExtraErrorStates((prev) => ({ ...prev, [item.id]: false }));
                             }}
                             className="rounded-md bg-black/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-black/90"
                           >
                             OPEN
                           </button>
                         </div>
                       </>
                     )}
                   </div>
                   <p className="mt-3 text-[11px] text-[#92928D]">Preview only — download disabled</p>
                 </div>
               );
             })}
          </div>
        )}
      </section>

      {/* What's Next */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E83E8C]">
            Currently in development
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What&apos;s Next
          </h2>
          <p className="mt-3 text-base font-semibold text-white sm:text-lg">
            Website & Application Development
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#C7C7C3]">
            We&apos;re expanding DigiCrystal into complete digital product development. Website and
            application services are currently in development and will be available soon.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] p-6 sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#1769E0] to-transparent" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
                  01
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Websites</h3>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1769E0]">
                Coming Soon
              </span>
            </div>

            <div className="mt-5 rounded-xl border border-[#363636] bg-[#0A0A0A] p-4">
              <div className="rounded-t-xl border border-[#EDEDF0] bg-white overflow-hidden">
                <div className="flex items-center gap-1.5 border-b border-[#EDEDF0] px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                  <div className="mx-auto h-2 w-24 rounded-full bg-[#EDEDF0]" />
                </div>
                <div className="bg-[#F7F7F9] p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#6B6B6B]">Welcome to</p>
                      <p className="text-sm font-bold text-[#1A1A1A]">Your Website</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-[#1769E0] flex items-center justify-center">
                        <div className="h-3 w-3 rounded-sm bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-lg border border-[#EDEDF0] bg-white p-2.5">
                      <div className="h-6 w-6 rounded-md bg-[#1769E0]/10 flex items-center justify-center mb-2">
                        <div className="h-2 w-2 rounded-sm bg-[#1769E0]" />
                      </div>
                      <div className="h-1.5 w-8 rounded-full bg-[#363636]/10 mb-1.5" />
                      <div className="h-1.5 w-6 rounded-full bg-[#363636]/10" />
                    </div>
                    <div className="rounded-lg border border-[#EDEDF0] bg-white p-2.5">
                      <div className="h-6 w-6 rounded-md bg-[#E83E8C]/10 flex items-center justify-center mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#E83E8C]" />
                      </div>
                      <div className="h-1.5 w-8 rounded-full bg-[#363636]/10 mb-1.5" />
                      <div className="h-1.5 w-6 rounded-full bg-[#363636]/10" />
                    </div>
                    <div className="rounded-lg border border-[#EDEDF0] bg-white p-2.5">
                      <div className="h-6 w-6 rounded-md bg-[#1769E0]/10 flex items-center justify-center mb-2">
                        <div className="h-2 w-2 rounded-full bg-[#1769E0]" />
                      </div>
                      <div className="h-1.5 w-8 rounded-full bg-[#363636]/10 mb-1.5" />
                      <div className="h-1.5 w-6 rounded-full bg-[#363636]/10" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#EDEDF0] bg-white p-3">
                    <div className="h-2 w-20 rounded-full bg-[#363636]/10 mb-2.5" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-[#363636]/10" />
                      <div className="h-2 w-5/6 rounded-full bg-[#363636]/10" />
                      <div className="h-2 w-4/6 rounded-full bg-[#363636]/10" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <div className="h-7 w-16 rounded-lg bg-[#1769E0]" />
                      <div className="h-7 w-16 rounded-lg border border-[#EDEDF0]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="h-16 rounded-lg border border-[#EDEDF0] bg-white" />
                    <div className="h-16 rounded-lg border border-[#EDEDF0] bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {[
                "Business websites",
                "Landing pages",
                "Portfolio websites",
                "E-commerce experiences",
                "Custom web solutions",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#C7C7C3]">
                  <span className="h-1 w-1 rounded-full bg-[#1769E0]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] p-6 sm:p-8">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#E83E8C] to-transparent" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E83E8C]">
                  02
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">Applications</h3>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E83E8C]">
                Coming Soon
              </span>
            </div>

            <div className="mt-5 flex justify-center">
              <div className="w-full max-w-[260px] rounded-[2rem] border-4 border-[#363636] bg-[#F7F7F9] shadow-[0_20px_50px_rgba(0,0,0,0.35)] overflow-hidden">
                <div className="bg-white/80 px-4 py-2.5 border-b border-[#EDEDF0] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#1769E0]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-[#E83E8C]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-[#92928D]" />
                  </div>
                  <div className="h-1.5 w-16 rounded-full bg-[#EDEDF0]" />
                  <div className="h-4 w-4 rounded-full bg-[#1769E0]/10" />
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#1769E0]/10 border border-[#1769E0]/20 flex items-center justify-center text-[10px] font-bold text-[#1769E0]">
                      DC
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#1A1A1A]">Welcome back</p>
                      <p className="text-[10px] text-[#6B6B6B]">Dashboard</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 rounded-full bg-[#E83E8C]/10 px-2 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E83E8C]" />
                      <span className="text-[9px] font-semibold text-[#E83E8C]">3</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#EDEDF0] bg-white p-3">
                    <p className="text-[10px] font-semibold text-[#6B6B6B]">Your projects</p>
                    <div className="mt-3 flex items-end gap-2">
                      <div>
                        <p className="text-xl font-bold text-[#1A1A1A]">3</p>
                        <p className="text-[9px] text-[#6B6B6B]">Active</p>
                      </div>
                      <div className="mb-1 h-1.5 w-1.5 rounded-full bg-[#1769E0]" />
                      <div>
                        <p className="text-xl font-bold text-[#1A1A1A]">2</p>
                        <p className="text-[9px] text-[#6B6B6B]">Completed</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-[#EDEDF0]">
                      <div className="h-1.5 w-3/4 rounded-full bg-[#1769E0]" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-[10px] font-semibold text-[#6B6B6B]">Recent activity</p>
                    {[
                      { title: "Website project", time: "2m ago", color: "#1769E0" },
                      { title: "Application update", time: "1h ago", color: "#E83E8C" },
                      { title: "New project request", time: "3h ago", color: "#1769E0" },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="flex items-center justify-between rounded-lg border border-[#EDEDF0] bg-white px-3 py-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-[11px] font-medium text-[#1A1A1A]">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[9px] text-[#92928D]">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#EDEDF0] bg-white/80 px-6 py-2.5 flex items-center justify-between">
                  {[
                    { label: "Home", active: true },
                    { label: "Projects", active: false },
                    { label: "Messages", active: false },
                    { label: "Profile", active: false },
                  ].map((tab) => (
                    <div key={tab.label} className="flex flex-col items-center gap-1">
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{
                          backgroundColor: tab.active ? "#1769E0" : "#C7C7C3",
                        }}
                      />
                      <span
                        className="text-[9px] font-medium"
                        style={{ color: tab.active ? "#1769E0" : "#92928D" }}
                      >
                        {tab.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {[
                "Web applications",
                "Custom applications",
                "Business applications",
                "Digital products",
                "Application interfaces",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#C7C7C3]">
                  <span className="h-1 w-1 rounded-full bg-[#E83E8C]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button asChild size="lg" className="bg-[#1769E0] text-white hover:bg-[#0F56BD]">
            <Link to="/start-project" search={{ service: undefined, brand: "digicrystal" }}>
              Start a Project <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
          </Button>
          <p className="text-sm text-[#92928D]">
            Have a website or application idea already? Tell us what you&apos;re building and
            we&apos;ll help you plan the next step.
          </p>
        </div>
      </section>

      {/* Start Something */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1769E0]/20 to-[#E83E8C]/20 blur-[100px]" />
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-[#363636] bg-[#181818] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-[#1769E0] to-[#E83E8C]" />
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#1769E0]">
              Ready to Build?
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Have an idea? Let&apos;s make it real.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#C7C7C3]">
              Tell us what you want to create — a video, website, AI solution, design, automation,
              presentation, or something completely different.
            </p>
            <p className="mt-3 text-sm text-[#92928D]">
              Not sure what you need? Tell us the idea. We&apos;ll help you figure out the right
              approach.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <Button asChild size="lg" className="bg-[#E83E8C] text-white hover:bg-[#C92E75]">
              <Link to="/start-project" search={{ service: undefined, brand: "digicrystal" }}>
                Start a DigiCrystal Project{" "}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
