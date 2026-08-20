export type DigiGroup = {
  id: string;
  name: string;
  blurb: string;
  items: string[];
};

export const digicrystalGroups: DigiGroup[] = [
  {
    id: "ai",
    name: "AI",
    blurb: "AI applied to real work: content, creative output and internal workflows.",
    items: [
      "AI-powered UGC ad creatives",
      "AI content creation",
      "AI workflow solutions",
      "Generative AI solutions",
      "AI-assisted business tools",
      "AI automation",
    ],
  },
  {
    id: "video",
    name: "Video",
    blurb: "Short-form and brand video built for platforms people actually watch on.",
    items: [
      "Promotional videos",
      "Social media videos",
      "Product videos",
      "UGC-style ad creatives",
      "Brand videos",
      "Reels & short-form content",
      "Video editing",
      "Motion graphics",
    ],
  },
  {
    id: "graphics",
    name: "Images & Graphics",
    blurb: "Design work across campaigns, products and everyday marketing needs.",
    items: [
      "Social media creatives",
      "Posters",
      "Banners",
      "Advertisements",
      "Product visuals",
      "Brand graphics",
      "Thumbnails",
      "Marketing graphics",
    ],
  },
  {
    id: "presentations",
    name: "Presentations",
    blurb: "Decks that hold attention and carry an argument.",
    items: [
      "PowerPoint presentations",
      "Business presentations",
      "Pitch decks",
      "Investor presentations",
      "Corporate presentations",
      "Educational presentations",
      "Presentation redesign",
    ],
  },
  {
    id: "websites",
    name: "Websites",
    blurb: "Sites built to be fast, responsive and maintainable.",
    items: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "E-commerce experiences",
      "Custom web applications",
      "Website redesign",
      "UI/UX",
    ],
  },
  {
    id: "applications",
    name: "Applications",
    blurb: "Practical software for teams and operations.",
    items: [
      "Web applications",
      "Business applications",
      "Dashboard applications",
      "Application prototypes",
      "Custom digital solutions",
    ],
  },
  {
    id: "automation",
    name: "Automation",
    blurb: "Workflows that remove repetitive work and connect the tools you already use.",
    items: [
      "n8n workflows",
      "Business automation",
      "AI automation",
      "Workflow automation",
      "Data processing",
      "API integrations",
      "Repetitive-task automation",
    ],
  },
  {
    id: "business",
    name: "Business & Data",
    blurb: "Spreadsheets, reporting and documentation that make decisions easier.",
    items: [
      "Excel solutions",
      "Excel dashboards",
      "Data organization",
      "Business reports",
      "Data visualization",
      "Business presentations",
      "Documentation",
      "Digital workflows",
    ],
  },
  {
    id: "content",
    name: "Digital Content",
    blurb: "Content packages for launches, campaigns and ongoing presence.",
    items: [
      "Social media content",
      "Marketing content",
      "Brand content",
      "Digital campaigns",
      "Promotional material",
      "Content packages",
    ],
  },
];

export const digicrystalDemos = [
  {
    title: "Video Demo",
    body: "A sample promotional video concept and edit treatment.",
    cta: "Watch Demo",
  },
  {
    title: "Image Demo",
    body: "A gallery of sample creative designs across formats.",
    cta: "View Gallery",
  },
  {
    title: "UGC Ad Demo",
    body: "An AI-assisted UGC-style advertisement concept.",
    cta: "View Demo",
  },
  {
    title: "Website Demo",
    body: "A fictional business website you can browse end to end.",
    cta: "Open Demo",
  },
  {
    title: "App Demo",
    body: "A sample application dashboard with demo data.",
    cta: "Open App Demo",
  },
  {
    title: "Generative AI Demo",
    body: "A sample AI content assistant interface.",
    cta: "Try Demo",
  },
  {
    title: "n8n Automation Demo",
    body: "Trigger → AI processing → data → action, shown as a workflow.",
    cta: "View Workflow",
  },
  {
    title: "Excel Demo",
    body: "A fictional business analytics dashboard.",
    cta: "Open Excel Demo",
  },
  {
    title: "Presentation Demo",
    body: "Sample slides from a business deck.",
    cta: "View Presentation",
  },
];
