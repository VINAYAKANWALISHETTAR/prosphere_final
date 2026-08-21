import { useState, useRef, useEffect, type ReactNode } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface ProsphereAdVideo {
  title: string;
  video: string;
  preview: string;
}

const prosphereAdVideos: ProsphereAdVideo[] = [
  {
    title: "ProSphere Ad",
    video: "/assets/Prosphere_ADS/ads.mp4",
    preview: "/assets/Prosphere_ADS/ads_t.jpeg",
  },
  {
    title: "Nova Shoes",
    video: "/assets/Prosphere_ADS/nova_shoes_ads.mp4",
    preview: "/assets/Prosphere_ADS/nova_shoes_t.jpeg",
  },
  {
    title: "Chair Ad",
    video: "/assets/Prosphere_ADS/chair_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair_t.jpeg",
  },
  {
    title: "Chair Ad 2",
    video: "/assets/Prosphere_ADS/chair2_ads.mp4",
    preview: "/assets/Prosphere_ADS/chair2_t.jpeg",
  },
  {
    title: "Coca-Cola",
    video: "/assets/Prosphere_ADS/cococola_ads.mp4",
    preview: "/assets/Prosphere_ADS/cococola_t.mp4.jpeg",
  },
  {
    title: "Ponds",
    video: "/assets/Prosphere_ADS/ponds_ADS.mp4",
    preview: "/assets/Prosphere_ADS/ponds_t.jpeg",
  },
  {
    title: "Car Adventures",
    video: "/assets/Prosphere_ADS/car_adventures_ads.mp4",
    preview: "/assets/Prosphere_ADS/car_adventure_t.jpeg",
  },
  {
    title: "Creative Intro",
    video: "/assets/Prosphere_ADS/MM Introduction Creative Clip.mp4",
    preview: "/assets/Prosphere_ADS/MM_introduction_t.jpeg",
  },
  {
    title: "DC Tech Intro",
    video: "/assets/Prosphere_ADS/DC Technologies Introduction.mp4",
    preview: "/assets/Prosphere_ADS/Dc_introduction_t.jpeg",
  },
  {
    title: "AI + UGC Ads for Brands",
    video: "/assets/Prosphere_ADS/AI + UGC Ads for Brands.mp4",
    preview: "/assets/Prosphere_ADS/AI + UGC Ads for Brands_t.jpeg",
  },
];

interface ProsphereAdCardProps {
  video: ProsphereAdVideo;
}

export function ProsphereAdCard({ video }: ProsphereAdCardProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (isEnded) {
      v.currentTime = 0;
      setIsEnded(false);
    }

    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    setIsMuted(next);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
  };

  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          video.muted = true;
          setIsPlaying(false);
          setIsMuted(true);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video rounded-lg overflow-hidden bg-[#111111] border border-[#E5E7EB]"
    >
      {isOpen ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          preload="metadata"
          muted={isMuted}
          loop={false}
          playsInline
          autoPlay
          controls={false}
          onContextMenu={(e) => e.preventDefault()}
          onEnded={handleEnded}
        >
          <source src={video.video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={video.preview}
          alt={video.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      {!isOpen && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-md bg-black/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-black/90"
          >
            OPEN
          </button>
        </div>
      )}

      {isOpen && (
        <>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 py-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button
              type="button"
              onClick={toggleMute}
              className="flex size-8 items-center justify-center rounded-md bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          </div>
        </>
      )}

      <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
        {video.title}
      </span>
    </div>
  );
}

export { prosphereAdVideos };
