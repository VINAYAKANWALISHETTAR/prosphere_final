// All content in this file is fictional demonstration data.

export type Severity = "Critical" | "High" | "Medium" | "Low" | "Informational";
export type FindingStatus = "Open" | "In progress" | "Retest" | "Resolved";

export type Finding = {
  id: string;
  title: string;
  severity: Severity;
  area: string;
  evidence: string;
  impact: string;
  remediation: string;
  priority: "P1" | "P2" | "P3" | "P4";
  status: FindingStatus;
};

export const severityOrder: Severity[] = ["Critical", "High", "Medium", "Low", "Informational"];

export const demoEngagement = {
  client: "Northwind Retail (fictional)",
  scope: "https://demo.northwind-retail.example — public storefront and customer account area",
  window: "12–18 March, authorised in writing by the site owner",
  tester: "ProSphere assessment team",
  reference: "PS-DEMO-0142",
};

export const demoFindings: Finding[] = [
  {
    id: "PS-001",
    title: "Login form accepts unlimited password attempts",
    severity: "Critical",
    area: "/account/login",
    evidence:
      "500 sequential attempts from a single address returned no lockout, delay or challenge.",
    impact: "An attacker can guess weak customer passwords at scale and take over accounts.",
    remediation:
      "Add progressive delays, account lockout after repeated failures and a challenge after 5 attempts.",
    priority: "P1",
    status: "Open",
  },
  {
    id: "PS-002",
    title: "Order details reachable by changing the order number",
    severity: "Critical",
    area: "/account/orders/{id}",
    evidence:
      "A signed-in test account could load orders belonging to a second test account by editing the id.",
    impact: "Customer names, addresses and purchase history are exposed to other signed-in users.",
    remediation: "Check ownership of the order server-side before returning any order data.",
    priority: "P1",
    status: "In progress",
  },
  {
    id: "PS-003",
    title: "Stored script injection in product review field",
    severity: "High",
    area: "/product/{slug} — review submission",
    evidence:
      "A review containing a script payload was saved and executed when the product page was viewed.",
    impact: "Scripts run in other shoppers' browsers, enabling session theft or page manipulation.",
    remediation: "Encode output on render and validate review content on the server.",
    priority: "P1",
    status: "Retest",
  },
  {
    id: "PS-004",
    title: "Session cookie missing secure attributes",
    severity: "High",
    area: "Global — session cookie",
    evidence: "Session cookie issued without HttpOnly and SameSite attributes.",
    impact: "Session values are readable by scripts and can be sent on cross-site requests.",
    remediation: "Set HttpOnly, Secure and SameSite=Lax on all session cookies.",
    priority: "P2",
    status: "Resolved",
  },
  {
    id: "PS-005",
    title: "Password reset tokens do not expire",
    severity: "High",
    area: "/account/reset",
    evidence: "A reset link generated 9 days earlier was still accepted.",
    impact: "An old email in a compromised inbox remains a valid route into the account.",
    remediation: "Expire reset tokens after 30 minutes and invalidate them once used.",
    priority: "P2",
    status: "Open",
  },
  {
    id: "PS-006",
    title: "Verbose error page reveals framework and version",
    severity: "Medium",
    area: "/checkout — 500 handler",
    evidence:
      "An invalid payload returned a stack trace naming the framework, version and file paths.",
    impact: "Gives an attacker a precise target list of known issues for that version.",
    remediation: "Return a generic error page in production and log details server-side only.",
    priority: "P3",
    status: "In progress",
  },
  {
    id: "PS-007",
    title: "File upload accepts oversized and unexpected types",
    severity: "Medium",
    area: "/account/support — attachment",
    evidence: "A 90 MB archive was accepted with no type restriction applied.",
    impact: "Storage exhaustion and the risk of serving dangerous files back to users.",
    remediation: "Restrict to a defined type list, cap file size and store outside the web root.",
    priority: "P3",
    status: "Open",
  },
  {
    id: "PS-008",
    title: "Missing security headers",
    severity: "Low",
    area: "Global — HTTP responses",
    evidence:
      "No Content-Security-Policy, X-Content-Type-Options or Referrer-Policy headers present.",
    impact: "Reduces defence in depth against injection and data leakage through referrers.",
    remediation: "Add a baseline header set at the edge or in the application response layer.",
    priority: "P4",
    status: "Resolved",
  },
  {
    id: "PS-009",
    title: "Directory listing enabled on asset folder",
    severity: "Low",
    area: "/assets/uploads/",
    evidence: "The folder index rendered a browsable list of uploaded files.",
    impact: "Files intended to be unlisted can be discovered and downloaded.",
    remediation: "Disable directory indexing and serve assets through explicit routes.",
    priority: "P4",
    status: "Retest",
  },
  {
    id: "PS-010",
    title: "Outdated JavaScript dependency in checkout bundle",
    severity: "Informational",
    area: "Checkout bundle",
    evidence:
      "A bundled library is four minor versions behind current, with published fixes in between.",
    impact: "No exploit observed; carries avoidable future risk.",
    remediation: "Schedule a dependency update and add automated version monitoring.",
    priority: "P4",
    status: "Open",
  },
];

export const remediationTimeline = [
  { date: "Day 0", label: "Assessment complete", detail: "10 findings documented and delivered." },
  {
    date: "Day 2",
    label: "Walkthrough call",
    detail: "Findings explained and priorities agreed with the team.",
  },
  {
    date: "Day 6",
    label: "First fixes shipped",
    detail: "Cookie attributes and header baseline deployed.",
  },
  {
    date: "Day 9",
    label: "Retest round one",
    detail: "Two findings verified as resolved, one returned for rework.",
  },
  {
    date: "Day 14",
    label: "Retest round two",
    detail: "Remaining high-severity items scheduled with owners.",
  },
];

export type TestRun = {
  id: string;
  suite: string;
  type: "Functional" | "Regression" | "Compatibility" | "Performance" | "Accessibility";
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: string;
  environment: string;
};

export const demoTestRuns: TestRun[] = [
  {
    id: "RUN-311",
    suite: "Checkout journey",
    type: "Functional",
    total: 84,
    passed: 79,
    failed: 4,
    skipped: 1,
    duration: "6m 12s",
    environment: "Staging",
  },
  {
    id: "RUN-310",
    suite: "Account & auth",
    type: "Regression",
    total: 122,
    passed: 120,
    failed: 1,
    skipped: 1,
    duration: "9m 41s",
    environment: "Staging",
  },
  {
    id: "RUN-309",
    suite: "Browser matrix",
    type: "Compatibility",
    total: 48,
    passed: 44,
    failed: 3,
    skipped: 1,
    duration: "14m 05s",
    environment: "Device cloud",
  },
  {
    id: "RUN-308",
    suite: "Catalogue load",
    type: "Performance",
    total: 20,
    passed: 17,
    failed: 3,
    skipped: 0,
    duration: "22m 30s",
    environment: "Pre-prod",
  },
  {
    id: "RUN-307",
    suite: "Keyboard & screen reader",
    type: "Accessibility",
    total: 36,
    passed: 33,
    failed: 2,
    skipped: 1,
    duration: "5m 58s",
    environment: "Staging",
  },
];

export const demoDefects = [
  {
    id: "BUG-88",
    title: "Discount code clears when quantity changes",
    severity: "High",
    area: "Cart",
    status: "Open",
  },
  {
    id: "BUG-86",
    title: "Address form loses state on back navigation",
    severity: "Medium",
    area: "Checkout",
    status: "In progress",
  },
  {
    id: "BUG-84",
    title: "Product gallery arrows overlap on 360px width",
    severity: "Medium",
    area: "Mobile UI",
    status: "Retest",
  },
  {
    id: "BUG-81",
    title: "Search returns no results for hyphenated terms",
    severity: "High",
    area: "Search",
    status: "Open",
  },
  {
    id: "BUG-79",
    title: "Order confirmation email missing VAT line",
    severity: "Low",
    area: "Email",
    status: "Resolved",
  },
];

export const performanceBudget = [
  { metric: "Largest contentful paint", value: "2.4 s", target: "≤ 2.5 s", ok: true },
  { metric: "Interaction to next paint", value: "310 ms", target: "≤ 200 ms", ok: false },
  { metric: "Cumulative layout shift", value: "0.04", target: "≤ 0.1", ok: true },
  { metric: "Total blocking time", value: "480 ms", target: "≤ 300 ms", ok: false },
];
