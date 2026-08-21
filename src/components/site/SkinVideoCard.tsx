import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface SkinVideo {
  title: string;
  src: string;
  preview: string;
}

const skinVideos: SkinVideo[] = [
  {
    title: "Skin 1",
    src: "/assets/skin_videos/1.mp4",
    preview: "/assets/skin_videos/1_t.jpeg",
  },
  {
    title: "Skin 2",
    src: "/assets/skin_videos/2.mp4",
    preview: "/assets/skin_videos/2_t.jpeg",
  },
  {
    title: "Skin 3",
    src: "/assets/skin_videos/3.mp4",
    preview: "/assets/skin_videos/3_t.jpeg",
  },
  {
    title: "Skin 4",
    src: "/assets/skin_videos/4.mp4",
    preview: "/assets/skin_videos/4_t.jpeg",
  },
  {
    title: "Skin 5",
    src: "/assets/skin_videos/5.mp4",
    preview: "/assets/skin_videos/5_t.jpeg",
  },
  {
    title: "Skin 6",
    src: "/assets/skin_videos/6.mp4",
    preview: "/assets/skin_videos/6_t.jpeg",
  },
  {
    title: "Skin 7",
    src: "/assets/skin_videos/7.mp4",
    preview: "/assets/skin_videos/7_t.jpeg",
  },
  {
    title: "Skin 8",
    src: "/assets/skin_videos/8.mp4",
    preview: "/assets/skin_videos/8_t.jpeg",
  },
  {
    title: "Skin Image",
    src: "/assets/skin_videos/skin_image.webp",
    preview: "/assets/skin_videos/skin_image.webp",
  },
];

interface SkinVideoCardProps {
  video: SkinVideo;
}

export function SkinVideoCard({ video }: SkinVideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (isEnded) {
      v.currentTime = 0;
      setIsEnded(false);
    }

    if (v.paused) {
      v.play()
        .then(() => {
          if (mountedRef.current) setIsPlaying(true);
        })
        .catch(() => {
          if (mountedRef.current) setIsPlaying(false);
        });
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

  const handleVideoError = () => {
    setIsOpen(false);
  };

  const handleLoadedData = () => {
    const v = videoRef.current;
    if (!v || !isOpen) return;
    v.play()
      .then(() => {
        if (mountedRef.current) setIsPlaying(true);
      })
      .catch(() => {
        if (mountedRef.current) setIsPlaying(false);
      });
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
          if (mountedRef.current) {
            setIsPlaying(false);
            setIsMuted(true);
          }
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
          autoPlay={false}
          controls={false}
          onContextMenu={(e) => e.preventDefault()}
          onEnded={handleEnded}
          onError={handleVideoError}
          onLoadedData={handleLoadedData}
        >
          <source src={video.src} type="video/mp4" />
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
      )}

      <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
        {video.title}
      </span>
    </div>
  );
}

export { skinVideos };
