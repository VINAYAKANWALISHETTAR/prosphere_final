import type { ReactNode } from "react";

function AiPreview() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(23,105,224,0.35),_transparent_32%),linear-gradient(135deg,#111111,#1C1C1C_52%,#181818)]">
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="h-10 w-14 rounded-sm bg-[#181818]/80 shadow-sm" />
        <span className="h-10 w-20 rounded-sm bg-[#1769E0]/30 shadow-sm" />
      </div>
      <div className="absolute bottom-4 right-4 h-12 w-16 rounded-md bg-[#0A0A0A]/90 p-2">
        <div className="h-full rounded-sm bg-[#181818]/80" />
      </div>
    </div>
  );
}

function VideoPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#111111,#1C1C1C_55%,#181818)]">
      <div className="absolute inset-x-4 top-4 h-16 rounded-md bg-[#0A0A0A]/90" />
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white/80" />
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
        <span className="h-2 flex-1 rounded-full bg-[#1769E0]" />
        <span className="h-2 w-16 rounded-full bg-[#363636]" />
      </div>
    </div>
  );
}

function GraphicsPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1C1C,#1C1C1C_35%,#111111_100%)]">
      <div className="absolute left-5 top-6 h-16 w-16 rounded-2xl bg-[#E83E8C]/60 shadow-lg" />
      <div className="absolute right-5 top-8 h-12 w-20 rounded-xl bg-[#0A0A0A]/90" />
      <div className="absolute bottom-5 left-6 right-6 h-8 rounded-md bg-[#181818]/70" />
    </div>
  );
}

function WebsitesPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1C1C,#181818_38%,#111111)] p-3">
      <div className="h-full w-full border border-[#363636] bg-[#181818]/90 p-2.5">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#363636]" />
          <span className="h-2 w-2 rounded-full bg-[#363636]" />
          <span className="h-2 w-2 rounded-full bg-[#363636]" />
        </div>
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-2">
          <div className="h-16 rounded-sm bg-[#1769E0]/40" />
          <div className="h-16 rounded-sm bg-[#363636]" />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          <span className="h-7 rounded-sm bg-[#363636]" />
          <span className="h-7 rounded-sm bg-[#30302E]" />
          <span className="h-7 rounded-sm bg-[#30302E]" />
        </div>
      </div>
    </div>
  );
}

function AppsPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#111111,#1C1C1C_60%,#111111)] p-3">
      <div className="flex h-full gap-2">
        <div className="w-12 rounded-md bg-[#0A0A0A]/90 p-1.5 text-[8px] text-white">
          <div className="mb-1 h-1.5 rounded bg-white/30" />
          <div className="mb-1 h-1.5 rounded bg-white/20" />
          <div className="h-7 rounded bg-[#1769E0]/70" />
        </div>
        <div className="flex-1 rounded-md bg-[#181818]/90 p-2">
          <div className="mb-1.5 h-1.5 w-12 rounded-full bg-[#363636]" />
          <div className="mb-1.5 flex gap-1.5">
            <span className="h-7 w-7 rounded bg-[#1769E0]/40" />
            <span className="h-7 w-7 rounded bg-[#363636]" />
            <span className="h-7 w-7 rounded bg-[#30302E]" />
          </div>
          <div className="h-9 rounded bg-[#363636]/80" />
        </div>
      </div>
    </div>
  );
}

function PresentationsPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1C1C,#1C1C1C_40%,#111111)] p-3">
      <div className="h-full rounded-sm border border-[#363636] bg-[#181818]/90 p-2.5">
        <div className="mb-2 flex gap-1">
          <span className="h-1.5 flex-1 rounded-full bg-[#363636]" />
          <span className="h-1.5 w-10 rounded-full bg-[#1769E0]/60" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-16 rounded-sm bg-[#30302E]" />
          <div className="h-16 rounded-sm bg-[#1769E0]/30" />
        </div>
        <div className="mt-2 h-5 rounded-full bg-[#363636]" />
      </div>
    </div>
  );
}

function AutomationPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#1C1C1C,#111111_48%,#111111)] p-3">
      <div className="flex h-full items-center justify-center gap-2 text-[9px] font-semibold text-[#C7C7C3]">
        <span className="rounded-full bg-[#181818] px-2 py-1 shadow-sm text-white">Trigger</span>
        <span aria-hidden="true">→</span>
        <span className="rounded-full bg-[#E83E8C]/20 px-2 py-1 text-[#E83E8C]">n8n</span>
        <span aria-hidden="true">→</span>
        <span className="rounded-full bg-[#1769E0]/30 px-2 py-1 text-[#1769E0]">AI</span>
      </div>
    </div>
  );
}

function BusinessPreview() {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(135deg,#111111,#1C1C1C_45%,#111111)] p-3">
      <div className="flex h-full gap-2">
        <div className="flex flex-1 flex-col justify-end gap-2">
          <div className="h-4 rounded bg-[#1769E0]/40" />
          <div className="h-10 rounded bg-[#363636]" />
        </div>
        <div className="flex w-16 flex-col justify-end gap-2">
          <div className="h-8 rounded bg-[#363636]" />
          <div className="h-10 rounded bg-[#1769E0]/40" />
        </div>
      </div>
    </div>
  );
}

const previewMap: Record<string, () => ReactNode> = {
  ai: AiPreview,
  video: VideoPreview,
  graphics: GraphicsPreview,
  websites: WebsitesPreview,
  apps: AppsPreview,
  presentations: PresentationsPreview,
  automation: AutomationPreview,
  business: BusinessPreview,
};

export function DigiCrystalPreview({
  preview,
  label,
  title,
}: {
  preview: string;
  label: string;
  title: string;
}): ReactNode {
  const Component = previewMap[preview];
  if (!Component) return null;
  return (
    <div className="relative h-[190px] overflow-hidden rounded-t-[22px] bg-[#111111]">
      <Component />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="w-full">
          <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1769E0]">
            {label}
          </div>
          <div className="mt-1 flex items-center justify-between text-sm font-medium text-white">
            <span>{title}</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}
