import type { ReactNode } from "react";

function ReportVisual() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-[#1769E0]">
        <span>Security Assessment</span>
        <span className="rounded-full border border-[#1769E0]/40 bg-[#1769E0]/15 px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] text-[#1769E0]">
          Demo Report
        </span>
      </div>
      <div className="mt-3 rounded-xl border border-[#2A2A2A] bg-[#222222] p-3 shadow-sm">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.12em] text-[#FFFFFF]">
          <span>Risk overview</span>
          <span className="rounded-full border border-[#363636] bg-[#181818] px-1.5 py-0.5 text-[8px] text-[#C7C7C3]">
            Demo Data
          </span>
        </div>
        <div className="mt-3 space-y-2 text-[11px] text-[#FFFFFF]">
          <div className="flex items-center justify-between">
            <span>High</span>
            <span>2</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Medium</span>
            <span>4</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Low</span>
            <span>7</span>
          </div>
        </div>
        <div className="mt-3 rounded border border-[#D9A62E]/40 bg-[#D9A62E]/10 p-2 text-[10px] text-[#FFFFFF]">
          <div className="font-semibold text-[#D9A62E]">Example finding:</div>
          <div className="mt-1">Missing security header</div>
        </div>
      </div>
    </div>
  );
}

function FlowVisual() {
  return (
    <div className="flex h-full items-center justify-center rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="w-full max-w-xs rounded-2xl border border-[#2A2A2A] bg-[#222222] p-4 shadow-sm">
        <div className="space-y-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#92928D]">
          <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#FFFFFF]">
            Login
          </div>
          <div className="text-[#363636]">↓</div>
          <div className="rounded-md border border-[#1769E0]/40 bg-[#1769E0]/10 px-2 py-2 text-[#1769E0]">
            Authentication
          </div>
          <div className="text-[#363636]">↓</div>
          <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#C7C7C3]">
            Authorisation
          </div>
          <div className="text-[#363636]">↓</div>
          <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#C7C7C3]">
            Input
          </div>
          <div className="text-[#363636]">↓</div>
          <div className="rounded-md border border-[#E83E8C]/40 bg-[#E83E8C]/10 px-2 py-2 text-[#E83E8C]">
            API
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div className="flex h-full flex-col rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
        <span>Vulnerability overview</span>
        <span className="rounded-full border border-[#363636] bg-[#181818] px-2 py-0.5 text-[8px] text-[#92928D]">
          Demo Data
        </span>
      </div>
      <div className="mt-3 grid gap-2 text-[10px] text-[#FFFFFF]">
        <div className="grid grid-cols-3 gap-2">
          <span>Critical</span>
          <span className="text-right">0</span>
          <span className="text-right text-[#D94A4A]">0</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span>High</span>
          <span className="text-right">2</span>
          <span className="text-right text-[#D94A4A]">2</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span>Medium</span>
          <span className="text-right">5</span>
          <span className="text-right text-[#D9A62E]">5</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span>Low</span>
          <span className="text-right">8</span>
          <span className="text-right text-[#1769E0]">8</span>
        </div>
      </div>
      <div className="mt-3 rounded-md border border-[#363636] bg-[#111111] px-2 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
        Identify → Prioritise → Remediate
      </div>
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div className="flex h-full items-center justify-center rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="w-full max-w-xs text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C7C7C3]">
        <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#FFFFFF]">
          Test Plan
        </div>
        <div className="py-2 text-[#363636]">↓</div>
        <div className="rounded-md border border-[#1769E0]/40 bg-[#1769E0]/10 px-2 py-2 text-[#1769E0]">
          Test Cases
        </div>
        <div className="py-2 text-[#363636]">↓</div>
        <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#FFFFFF]">
          Execution
        </div>
        <div className="py-2 text-[#363636]">↓</div>
        <div className="rounded-md border border-[#E83E8C]/40 bg-[#E83E8C]/10 px-2 py-2 text-[#E83E8C]">
          Evidence
        </div>
        <div className="py-2 text-[#363636]">↓</div>
        <div className="rounded-md border border-[#363636] bg-[#181818] px-2 py-2 text-[#FFFFFF]">
          Result
        </div>
      </div>
    </div>
  );
}

function ChecklistVisual() {
  return (
    <div className="flex h-full flex-col rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
        <span>Configuration Review</span>
        <span className="rounded-full border border-[#363636] bg-[#181818] px-2 py-0.5 text-[8px] text-[#92928D]">
          Sample Checklist
        </span>
      </div>
      <div className="mt-3 space-y-2 text-[10px] text-[#FFFFFF]">
        <div className="flex items-center gap-2">
          <span className="text-[#4CCB91]">✓</span>HTTPS
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4CCB91]">✓</span>Security Headers
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4CCB91]">✓</span>Access Control
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4CCB91]">✓</span>Secrets Handling
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#D9A62E]">⚠</span>Dependency Configuration
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#4CCB91]">✓</span>Error Handling
        </div>
      </div>
    </div>
  );
}

function BeforeAfterVisual() {
  return (
    <div className="flex h-full flex-col justify-between rounded-[1.2rem] border border-[#363636] bg-[#181818] p-4">
      <div className="grid grid-cols-2 gap-2 text-[9px]">
        <div className="rounded-lg border border-[#D94A4A]/40 bg-[#D94A4A]/10 p-2 text-[#FFFFFF]">
          <div className="font-semibold uppercase tracking-[0.16em] text-[#D94A4A]">Before</div>
          <ul className="mt-2 space-y-1 text-[9px] text-[#FFFFFF]">
            <li>Weak headers</li>
            <li>Open access</li>
            <li>Old dependency</li>
            <li>Unsafe error handling</li>
          </ul>
        </div>
        <div className="rounded-lg border border-[#4CCB91]/40 bg-[#4CCB91]/10 p-2 text-[#FFFFFF]">
          <div className="font-semibold uppercase tracking-[0.16em] text-[#4CCB91]">After</div>
          <ul className="mt-2 space-y-1 text-[9px] text-[#FFFFFF]">
            <li>Hardened headers</li>
            <li>Controlled access</li>
            <li>Updated dependency</li>
            <li>Safer error handling</li>
          </ul>
        </div>
      </div>
      <div className="mt-3 rounded-md border border-[#363636] bg-[#111111] px-2 py-1 text-center text-[8px] font-semibold uppercase tracking-[0.18em] text-[#92928D]">
        Example
      </div>
    </div>
  );
}

const visualMap: Record<string, () => ReactNode> = {
  report: ReportVisual,
  flow: FlowVisual,
  dashboard: DashboardVisual,
  workflow: WorkflowVisual,
  checklist: ChecklistVisual,
  "before-after": BeforeAfterVisual,
};

export function ServiceVisual({ type }: { type: string }): ReactNode {
  const Component = visualMap[type];
  if (!Component) return null;
  return <Component />;
}
