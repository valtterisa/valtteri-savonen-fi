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

export const projects: Project[] = [
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
          "a chat-operated store for digital and physical products. update the catalog by talking, take payments, and ship a storefront - or plug the same store into your own next.js site.",
        icon: "code",
        description: `- Wrote a single mutation bus: dashboard chat, MCP tools, and Telegram all enqueue catalog/page patches; a commit step applies them to Convex.
- Modeled digital (signed blob URLs) and physical SKUs in one catalog schema. Checkout is Stripe Checkout against the connected account.
- Extracted the dashboard's Convex queries/mutations into \`@quickshops/sdk\` and a \`useStore()\` hook used by custom Next.js storefronts.
- Backend is Convex plus an Elysia.js worker on Vercel.`,
        skills: [
          "Next.js",
          "TypeScript",
          "Convex",
          "Elysia.js",
          "Stripe",
          "MCP",
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
          "the fastest way to put a file or a static site on the internet. drop a zip or an html file, get a live https url you can share or point a domain at.",
        icon: "code",
        description: `- Built an ingest path that writes a file or an \`index.html\` zip tree to object storage and serves it on \`{slug}.drophost.space\` over TLS.
- Re-publish overwrites the same object prefix so the hostname does not change. Custom domains are CNAME to that prefix.
- Password gate is a project-row flag checked in the edge handler before the object is streamed.
- Dashboard upload and MCP \`publish\` call the same ingest function. Project rows live in Postgres (Drizzle); ACL via Clerk; entitlements via Autumn.`,
        skills: [
          "Next.js",
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
          "an ai website builder that turns a description into a real site. preview it live, then publish to your own subdomain.",
        icon: "code",
        description: `- Constrained codegen to a Zod \`SitePlan\`. An AI SDK \`ToolLoopAgent\` fills it; a pure scaffolder maps \`SitePlan\` to Astro files. Model text is never treated as a filesystem.
- Each session gets a Blaxel sandbox running \`astro dev\`; the preview URL is stored on the Convex project document.
- Tool-call traces are written to Convex so the chat UI is a query subscription.
- Publish runs \`wrangler pages deploy\` and creates \`{slug}.floras.app\` via the Cloudflare DNS API. Auth is Convex Auth; generation is metered with Autumn.`,
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
    ],
    positions: [
      {
        id: "haalarikone-product",
        title: "haalarikone.fi",
        summary:
          "the search engine for finnish student overalls. look up colors, schools, and cities across 500+ records - in finnish, english, and swedish.",
        icon: "code",
        description: `- Normalized 500+ overall records into \`overall_data.json\`. next-intl owns fi/en/sv, including translated route segments and slugs.
- Search is a local pipeline: parse color/area/school/field tokens, subset the JSON, then Fuse.js rank. Claude Haiku is a fallback that only runs on an empty subset.
- Finnish color inflections collapse to a canonical key (\`valkoinen\` / \`valkoiset\`) before matching.
- Vitest runs against that JSON. AGPL. CI on non-draft PRs.`,
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
];

export const experiences: Experience[] = [
  {
    id: "self-employed",
    companyName: "self-employed",
    isCurrentEmployer: true,
    positions: [
      {
        id: "self-employed-engineer",
        title: "full-stack engineer",
        summary:
          "full-stack engineer, founder. 09.2024 - present.",
        employmentPeriod: {
          start: "09.2024",
        },
        employmentType: "full-time",
        icon: "code",
        description: `- Designed and shipped [quickshops.app](https://quickshops.app), [drophost.space](https://drophost.space), [floras.app](https://floras.app), and [haalarikone.fi](https://haalarikone.fi).
- Various web development work for clients.`,
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
    id: "luxmarketfin",
    companyName: "luxmarketfin clothing & accessories",
    positions: [
      {
        id: "luxmarketfin-cofounder",
        title: "co-founder",
        summary: "co-founder. 05.2024 - present.",
        employmentPeriod: {
          start: "05.2024",
        },
        employmentType: "part-time",
        icon: "lightbulb",
        description: `- Stood up the storefront, catalog, and order flow for a pre-loved clothing shop.`,
        skills: ["E-commerce", "Operations", "Digital Presence"],
        isExpanded: true,
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

export type Tab = "projects" | "experience" | "blog";

export function normalizeTab(tab: string | null): Tab {
  if (tab === "experience" || tab === "blog") {
    return tab;
  }
  return "projects";
}
