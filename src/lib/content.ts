export type PositionIconName = "code" | "lightbulb";

export type ExperienceLink = {
  label: string;
  href: string;
};

export type ExperiencePosition = {
  id: string;
  title: string;
  summary?: string;
  employmentPeriod?: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  description?: string;
  icon?: PositionIconName;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItem = {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  positions: ExperiencePosition[];
  isCurrentEmployer?: boolean;
  links?: ExperienceLink[];
};

export type Project = ExperienceItem;
export type Experience = ExperienceItem;

export const products: Project[] = [
  {
    id: "quickshops",
    companyName: "quickshops.app",
    companyWebsite: "https://quickshops.app",
    isCurrentEmployer: true,
    links: [{ label: "view", href: "https://quickshops.app" }],
    positions: [
      {
        id: "quickshops-product",
        title: "quickshops.app",
        summary:
          "run an online store through chat — products, orders, and fulfillment for digital and physical goods.",
        icon: "code",
        description: `- Designed the UI and system architecture.
- Full commerce surface: products/SKUs, inventory, Stripe Checkout (connected accounts), orders, digital delivery (signed blob URLs), and physical fulfillment state.
- Agentic ops layer: natural-language chat drives catalog, pages, pricing, and order actions through a shared mutation bus (dashboard chat, Telegram, MCP tools enqueue the same patches; a commit step applies them to Convex).
- Headless API for custom storefronts, plus HTTP API and MCP so external agents/tools can manage the same backend.`,
        skills: [
          "Next.js",
          "TypeScript",
          "Convex",
          "Elysia.js",
          "Stripe",
          "MCP",
          "SDK",
          "Tailwind CSS",
          "Vercel",
        ],
      },
    ],
  },
  {
    id: "drophost",
    companyName: "drophost.space",
    companyWebsite: "https://drophost.space",
    isCurrentEmployer: true,
    links: [{ label: "view", href: "https://drophost.space" }],
    positions: [
      {
        id: "drophost-product",
        title: "drophost.space",
        summary:
          "drop a file or a site, get a stable link. hosting without the setup.",
        icon: "code",
        description: `- Upload files or an \`index.html\` zip to Cloudflare R2 and serve them from a custom page (\`{slug}.drophost.space\`), including custom domains.
- MCP so AI agents can use the app alongside a real user. Same publish path as the dashboard.`,
        skills: [
          "Next.js",
          "Cloudflare R2",
          "PostgreSQL",
          "Drizzle",
          "Clerk",
          "Autumn",
          "MCP",
        ],
      },
    ],
  },
  {
    id: "floras",
    companyName: "floras.app",
    companyWebsite: "https://floras.app",
    isCurrentEmployer: true,
    links: [
      { label: "github", href: "https://github.com/valtterisa/floras" },
      { label: "view", href: "https://floras.app" },
    ],
    positions: [
      {
        id: "floras-product",
        title: "floras.app",
        summary:
          "chat with an ai that designs, builds, and deploys a real website.",
        icon: "code",
        description: `- Chat with an AI agent that designs and builds the site as a real project (Astro), not a one-shot prompt dump.
- Production sandbox: each session gets an isolated environment running the live site so you can preview and iterate before go-live.
- Deploy to Cloudflare Pages + DNS for \`{slug}.floras.app\`.`,
        skills: [
          "Next.js",
          "TypeScript",
          "Convex",
          "AI SDK",
          "Blaxel",
          "Astro",
          "Cloudflare",
          "Autumn",
        ],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "haalarikone",
    companyName: "haalarikone.fi",
    companyWebsite: "https://haalarikone.fi",
    isCurrentEmployer: true,
    links: [
      {
        label: "github",
        href: "https://github.com/valtterisa/haalarikone-fi",
      },
      { label: "view", href: "https://haalarikone.fi" },
      {
        label: "analytics",
        href: "https://app.databuddy.cc/public/Uu3N9TuBuUAa3wAS4pHNw",
      },
    ],
    positions: [
      {
        id: "haalarikone-product",
        title: "haalarikone.fi",
        summary:
          "10k monthly users. find what someone studies from their student overall colors.",
        icon: "code",
        description: `- ~10k monthly users searching Finnish student overalls.
- Normalized catalog in \`overall_data.json\`. next-intl owns fi/en/sv, including translated route segments and slugs.
- Search pipeline: parse color/area/school/field tokens → subset JSON → Fuse.js rank. Claude Haiku is a fallback that only runs on an empty subset.
- Finnish color morphology collapsed to a canonical key (\`valkoinen\` / \`valkoiset\`) before matching.`,
        skills: [
          "Next.js",
          "TypeScript",
          "next-intl",
          "Fuse.js",
          "Vercel AI SDK",
          "Tailwind CSS",
          "Vercel",
        ],
      },
    ],
  },
  {
    id: "landrr",
    companyName: "landrr.js",
    companyWebsite: "https://valtterisa.github.io/landrr.js/",
    isCurrentEmployer: true,
    links: [
      {
        label: "github",
        href: "https://github.com/valtterisa/landrr.js",
      },
      { label: "npm", href: "https://www.npmjs.com/org/landrr" },
      { label: "view", href: "https://valtterisa.github.io/landrr.js/" },
      { label: "docs", href: "https://valtterisa.github.io/landrr.js/docs/" },
    ],
    positions: [
      {
        id: "landrr-product",
        title: "landrr.js",
        summary:
          "a framework for building fast, seo-ready websites without the usual boilerplate.",
        icon: "code",
        description: `- React 18 + Vite monorepo (\`@landrr/core\`, \`create-landrr-app\`) with SSR for SEO and first paint.
- Built-in \`Head\` meta helpers, React Router with SSR, and block-based site building.
- One-command scaffold: \`npx create-landrr-app\`. Packages on [npm/@landrr](https://www.npmjs.com/org/landrr).`,
        skills: [
          "React",
          "TypeScript",
          "Vite",
          "SSR",
          "Elysia.js",
          "Turborepo",
        ],
      },
    ],
  },
];

export const contributions: Project[] = [
  {
    id: "marblecms",
    companyName: "marblecms",
    companyWebsite: "https://marblecms.com",
    isCurrentEmployer: true,
    links: [
      {
        label: "github",
        href: "https://github.com/usemarble/marble",
      },
      { label: "view", href: "https://marblecms.com" },
    ],
    positions: [
      {
        id: "marblecms-contrib",
        title: "marblecms",
        summary:
          "open-source headless cms for publishing. part of the vercel oss program.",
        icon: "code",
        description: `- Bug fixes across the [Marble](https://marblecms.com) monorepo.
- Migrated the data layer from Prisma to Drizzle.
- This site’s blog runs on Marble’s REST API and webhooks.
- Part of the Vercel OSS Program.`,
        skills: ["TypeScript", "Drizzle", "PostgreSQL", "Next.js", "Hono"],
      },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: "self-employed",
    companyName: "self-employed",
    isCurrentEmployer: true,
    links: [
      {
        label: "freedomly",
        href: "https://freedomly.io/u/6790f803-65f2-45e9-ad42-4e3d843d98ae",
      },
      { label: "bittive", href: "https://bittive.com" },
    ],
    positions: [
      {
        id: "self-employed-engineer",
        title: "full-stack engineer",
        summary: "full-stack engineer, founder. 09.2024 - present.",
        employmentPeriod: {
          start: "09.2024",
        },
        employmentType: "full-time",
        icon: "code",
        description: `- Designed and shipped [quickshops.app](https://quickshops.app), [drophost.space](https://drophost.space), [floras.app](https://floras.app), [haalarikone.fi](https://haalarikone.fi), and [landrr.js](https://github.com/valtterisa/landrr.js).
- Various web development work for clients.
- Contributing to [MarbleCMS](https://marblecms.com) (bug fixes, Prisma → Drizzle).`,
        skills: [
          "Next.js",
          "TypeScript",
          "React",
          "Node.js",
          "PostgreSQL",
          "Convex",
        ],
        isExpanded: true,
      },
      {
        id: "self-employed-founder",
        title: "founder",
        employmentPeriod: {
          start: "09.2024",
        },
        employmentType: "full-time",
        icon: "lightbulb",
        skills: ["Business Ownership", "Product", "Freelance"],
      },
    ],
  },
  {
    id: "ikius",
    companyName: "ikius oy",
    companyWebsite: "https://ikius.com",
    positions: [
      {
        id: "ikius-web-developer",
        title: "web developer",
        summary: "web developer. 02.2023 - 09.2024.",
        employmentPeriod: {
          start: "02.2023",
          end: "09.2024",
        },
        employmentType: "full-time",
        icon: "code",
        description: `- Built and maintained Next.js, TypeScript, and React apps for international clients, including production deploys.
- One of those clients was Teleport (US), which reached unicorn status.`,
        skills: ["Next.js", "TypeScript", "React", "Node.js"],
        isExpanded: true,
      },
    ],
  },
];

export type Tab = "products" | "projects" | "experience" | "blog";

export function normalizeTab(tab: string | null): Tab {
  if (tab === "projects" || tab === "experience" || tab === "blog") {
    return tab;
  }
  return "products";
}
