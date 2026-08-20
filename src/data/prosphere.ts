export type ServiceCategory = {
  id: string;
  name: string;
  blurb: string;
};

export type Service = {
  slug: string;
  name: string;
  category: string;
  description: string;
  deliverables: string[];
  engagement: string;
};

export const prosphereCategories: ServiceCategory[] = [
  {
    id: "security",
    name: "Security",
    blurb:
      "Assessments, vulnerability identification and hardening guidance for websites and applications.",
  },
  {
    id: "testing",
    name: "Testing",
    blurb:
      "Functional, UI, compatibility, performance and regression testing with clear reporting.",
  },
  {
    id: "maintenance",
    name: "Maintenance",
    blurb: "Ongoing upkeep, bug fixing, optimisation and technical health checks.",
  },
  {
    id: "support",
    name: "Technical Support",
    blurb: "Troubleshooting, consultation and guidance when a project gets stuck.",
  },
];

export const prosphereServices: Service[] = [
  {
    slug: "website-security-assessment",
    name: "Website Security Assessment",
    category: "security",
    description:
      "Authorised review of a website's exposed surface to identify security weaknesses, understand the risk and receive actionable recommendations.",
    deliverables: [
      "Findings list with severity",
      "Affected areas and evidence",
      "Remediation guidance",
      "Retest summary",
    ],
    engagement: "Typical scope: 1 website, 3-5 working days",
  },
  {
    slug: "application-security-assessment",
    name: "Application Security Assessment",
    category: "security",
    description:
      "Assessment of web or business applications covering authentication, authorisation, input handling and configuration weaknesses.",
    deliverables: ["Assessment report", "Risk-rated findings", "Prioritised remediation plan"],
    engagement: "Typical scope: 1 application, 5-10 working days",
  },
  {
    slug: "vulnerability-identification",
    name: "Vulnerability Identification",
    category: "security",
    description:
      "Focused identification of known weaknesses across dependencies, configuration and exposed endpoints on systems you own or control.",
    deliverables: ["Vulnerability inventory", "Severity and priority", "Suggested fixes"],
    engagement: "Recurring or one-off",
  },
  {
    slug: "security-testing",
    name: "Security Testing",
    category: "security",
    description:
      "Hands-on, authorised testing of specific features or flows — login, payments, file upload, APIs — against common weakness classes.",
    deliverables: ["Test log", "Reproduction steps", "Impact description", "Recommendations"],
    engagement: "Scoped per feature set",
  },
  {
    slug: "security-configuration-review",
    name: "Security Configuration Review",
    category: "security",
    description:
      "Review of server, platform, CMS and application configuration against practical hardening baselines.",
    deliverables: ["Configuration checklist", "Gap analysis", "Hardening steps"],
    engagement: "1-3 working days",
  },
  {
    slug: "security-hardening-guidance",
    name: "Security Hardening Guidance",
    category: "security",
    description:
      "Practical guidance to strengthen headers, access control, secrets handling, dependency hygiene and error handling.",
    deliverables: ["Hardening plan", "Implementation notes", "Verification checklist"],
    engagement: "Advisory engagement",
  },
  {
    slug: "security-documentation",
    name: "Security Documentation",
    category: "security",
    description:
      "Written documentation of your security posture, controls and processes for internal use or client review.",
    deliverables: ["Security overview document", "Control inventory", "Process notes"],
    engagement: "Per document set",
  },
  {
    slug: "security-reports",
    name: "Security Reports",
    category: "security",
    description:
      "Professional reporting of assessment output in a structured, reviewable format for technical and non-technical readers.",
    deliverables: [
      "Executive summary",
      "Detailed findings",
      "Priority matrix",
      "Status and retest tracking",
    ],
    engagement: "Included with assessments or standalone",
  },
  {
    slug: "security-monitoring-guidance",
    name: "Basic Security Monitoring Guidance",
    category: "security",
    description:
      "Guidance on what to monitor, which signals matter, and how to respond — using tooling you already own where possible.",
    deliverables: ["Monitoring recommendations", "Alerting suggestions", "Response checklist"],
    engagement: "Advisory engagement",
  },
  {
    slug: "website-testing",
    name: "Website Testing",
    category: "testing",
    description:
      "End-to-end review of a website's behaviour across pages, forms, flows and devices.",
    deliverables: ["Test cases", "Pass/fail results", "Bug list with evidence"],
    engagement: "Per website",
  },
  {
    slug: "application-testing",
    name: "Application Testing",
    category: "testing",
    description:
      "Structured testing of application features, states and edge cases against expected behaviour.",
    deliverables: ["Test plan", "Execution results", "Defect report"],
    engagement: "Per release or per module",
  },
  {
    slug: "functional-testing",
    name: "Functional Testing",
    category: "testing",
    description:
      "Verification that each feature does what it is supposed to do, including negative paths.",
    deliverables: ["Functional test suite", "Results summary"],
    engagement: "Per feature set",
  },
  {
    slug: "ui-testing",
    name: "UI Testing",
    category: "testing",
    description:
      "Interface review covering layout, states, responsiveness, readability and interaction consistency.",
    deliverables: ["UI issue list", "Annotated screenshots", "Priority ratings"],
    engagement: "Per interface",
  },
  {
    slug: "compatibility-testing",
    name: "Compatibility Testing",
    category: "testing",
    description:
      "Checks across browsers, devices and screen sizes to catch rendering and behaviour differences.",
    deliverables: ["Compatibility matrix", "Issue list per environment"],
    engagement: "Per browser/device matrix",
  },
  {
    slug: "performance-testing",
    name: "Performance Testing",
    category: "testing",
    description:
      "Measurement of load behaviour, page speed and resource usage, with concrete improvement suggestions.",
    deliverables: ["Performance baseline", "Bottleneck analysis", "Optimisation recommendations"],
    engagement: "Per site or endpoint set",
  },
  {
    slug: "regression-testing",
    name: "Regression Testing",
    category: "testing",
    description: "Re-verification of existing functionality after changes, updates or fixes.",
    deliverables: ["Regression suite", "Run report", "Regression status"],
    engagement: "Per release cycle",
  },
  {
    slug: "quality-assurance",
    name: "Quality Assurance",
    category: "testing",
    description:
      "A repeatable QA process for your team: what gets tested, when, by whom and how it is recorded.",
    deliverables: ["QA workflow", "Templates", "Reporting format"],
    engagement: "Setup plus ongoing",
  },
  {
    slug: "bug-identification",
    name: "Bug Identification",
    category: "testing",
    description:
      "Systematic hunting for defects with clear, reproducible reports developers can act on.",
    deliverables: ["Reproducible bug reports", "Severity ratings", "Evidence"],
    engagement: "Time-boxed or per project",
  },
  {
    slug: "test-report-generation",
    name: "Test Report Generation",
    category: "testing",
    description: "Clean reporting of test coverage and outcomes for stakeholders and clients.",
    deliverables: ["Test summary report", "Coverage view", "Open/closed defect status"],
    engagement: "Per cycle",
  },
  {
    slug: "website-maintenance",
    name: "Website Maintenance",
    category: "maintenance",
    description:
      "Ongoing upkeep so a site stays current, working and healthy — updates, fixes and checks.",
    deliverables: ["Maintenance schedule", "Change log", "Health report"],
    engagement: "Monthly retainer",
  },
  {
    slug: "application-maintenance",
    name: "Application Maintenance",
    category: "maintenance",
    description:
      "Continued care of an application after launch: fixes, small improvements and technical review.",
    deliverables: ["Issue queue", "Release notes", "Periodic review"],
    engagement: "Monthly retainer",
  },
  {
    slug: "bug-fixing",
    name: "Bug Fixing",
    category: "maintenance",
    description: "Diagnosis and resolution of defects in existing websites and applications.",
    deliverables: ["Root cause note", "Fix", "Verification"],
    engagement: "Per issue or bundled",
  },
  {
    slug: "technical-maintenance",
    name: "Technical Maintenance",
    category: "maintenance",
    description:
      "Routine technical work: environment upkeep, cleanup, configuration and small refactors.",
    deliverables: ["Maintenance log", "Recommendations"],
    engagement: "Scheduled",
  },
  {
    slug: "performance-optimization",
    name: "Performance Optimisation",
    category: "maintenance",
    description:
      "Targeted improvements to loading, rendering and response times based on measured data.",
    deliverables: ["Before/after metrics", "Applied optimisations"],
    engagement: "Per engagement",
  },
  {
    slug: "content-technical-updates",
    name: "Content & Technical Updates",
    category: "maintenance",
    description:
      "Routine content changes and technical edits handled without disrupting the live site.",
    deliverables: ["Update queue", "Deployment notes"],
    engagement: "Included in retainers",
  },
  {
    slug: "dependency-review",
    name: "Dependency & Update Review",
    category: "maintenance",
    description: "Review of packages, plugins and platform versions, with a safe upgrade path.",
    deliverables: ["Dependency report", "Upgrade plan", "Risk notes"],
    engagement: "Quarterly or on request",
  },
  {
    slug: "backup-recovery-guidance",
    name: "Backup & Recovery Guidance",
    category: "maintenance",
    description:
      "Guidance on backup coverage, retention and restore testing so recovery actually works.",
    deliverables: ["Backup review", "Restore checklist"],
    engagement: "Advisory engagement",
  },
  {
    slug: "technical-health-checks",
    name: "Technical Health Checks",
    category: "maintenance",
    description:
      "Periodic review of uptime, errors, performance, security posture and technical debt.",
    deliverables: ["Health check report", "Prioritised action list"],
    engagement: "Monthly or quarterly",
  },
  {
    slug: "troubleshooting",
    name: "Troubleshooting",
    category: "support",
    description: "Hands-on help when something breaks and the cause is not obvious.",
    deliverables: ["Problem analysis", "Cause explanation", "Next steps"],
    engagement: "Hourly or per issue",
  },
  {
    slug: "technical-consultation",
    name: "Technical Consultation",
    category: "support",
    description: "A working session on architecture, tooling, security or delivery decisions.",
    deliverables: ["Consultation notes", "Recommended approach"],
    engagement: "Per session",
  },
  {
    slug: "website-issue-analysis",
    name: "Website Issue Analysis",
    category: "support",
    description:
      "Investigation of a specific website problem — errors, downtime, broken behaviour or slowness.",
    deliverables: ["Analysis summary", "Evidence", "Fix options"],
    engagement: "Per issue",
  },
  {
    slug: "application-issue-analysis",
    name: "Application Issue Analysis",
    category: "support",
    description:
      "Investigation of application faults, integration failures and unexpected behaviour.",
    deliverables: ["Diagnosis", "Reproduction steps", "Recommended fix"],
    engagement: "Per issue",
  },
  {
    slug: "deployment-assistance",
    name: "Deployment Assistance",
    category: "support",
    description:
      "Support with getting a project live: builds, environments, domains and release checks.",
    deliverables: ["Deployment checklist", "Go-live support"],
    engagement: "Per deployment",
  },
  {
    slug: "configuration-assistance",
    name: "Configuration Assistance",
    category: "support",
    description:
      "Help configuring hosting, services, integrations and environment variables correctly and safely.",
    deliverables: ["Configuration walkthrough", "Documented settings"],
    engagement: "Per engagement",
  },
  {
    slug: "technical-documentation",
    name: "Technical Documentation",
    category: "support",
    description:
      "Documentation your team can actually use: setup, architecture, runbooks and handover notes.",
    deliverables: ["Documentation set", "Diagrams where useful"],
    engagement: "Per document set",
  },
  {
    slug: "project-guidance",
    name: "Project Guidance",
    category: "support",
    description:
      "Direction for projects that have stalled — scope, sequencing and a realistic path to finished.",
    deliverables: ["Project review", "Action plan", "Checkpoints"],
    engagement: "Per project",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Share your website or application",
    body: "You provide the relevant project information, scope and access details.",
  },
  {
    step: "02",
    title: "Initial assessment",
    body: "We review the requested scope, technical requirements and authorisation before any work begins.",
  },
  {
    step: "03",
    title: "Testing & analysis",
    body: "Authorised security, functional, performance or technical testing is carried out against the agreed scope.",
  },
  {
    step: "04",
    title: "Identify issues",
    body: "Discovered issues, vulnerabilities, bugs and technical problems are documented with evidence.",
  },
  {
    step: "05",
    title: "Report",
    body: "You receive a clear, structured report written for both technical and business readers.",
  },
  {
    step: "06",
    title: "Remediation guidance",
    body: "We explain how each identified issue can be addressed, in priority order.",
  },
  {
    step: "07",
    title: "Retesting",
    body: "Where applicable, fixes are verified and the status of each finding is updated.",
  },
  {
    step: "08",
    title: "Ongoing maintenance",
    body: "Continued maintenance and periodic technical review keep the improvement going.",
  },
];

export const reportFields = [
  { label: "Finding", detail: "What was identified, in plain language." },
  { label: "Severity", detail: "Critical, high, medium, low or informational." },
  { label: "Affected area", detail: "The page, endpoint, component or configuration involved." },
  { label: "Description", detail: "Why it matters and what the practical risk is." },
  { label: "Evidence", detail: "Screenshots, request details or logs where appropriate." },
  { label: "Recommended remediation", detail: "Concrete steps to address the finding." },
  { label: "Priority", detail: "Suggested order of work based on risk and effort." },
  { label: "Status", detail: "Open, in progress, resolved or accepted risk." },
  { label: "Verification / retest", detail: "Whether the fix was verified and when." },
];

export const AUTHORIZATION_STATEMENT =
  "Security testing is performed only on systems, websites and applications for which the client has provided appropriate authorization.";
