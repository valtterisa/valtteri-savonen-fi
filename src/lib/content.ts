export type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  active: boolean;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
};

export const projects: Project[] = [
  {
    title: "quickshops.app",
    description: "Your digital product store, run by chat.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Convex",
      "Elysia.js",
    ],
    liveUrl: "https://quickshops.app",
    active: true,
  },
  {
    title: "drophost.space",
    description: "Drop a file or a static site. Get a live URL.",
    technologies: ["Next.js", "PostgreSQL", "Drizzle", "Clerk", "Autumn"],
    liveUrl: "https://drophost.space",
    active: true,
  },
  {
    title: "floras.app",
    description: "AI website generator for Astro sites.",
    technologies: ["Astro", "TypeScript", "Convex", "Box", "Cloudflare"],
    liveUrl: "https://floras.app",
    active: true,
  },
  {
    title: "haalarikone.fi",
    description: "Finnish university students overall search tool.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://haalarikone.fi",
    active: true,
  },
];

export const experiences: Experience[] = [
  {
    title: "full-stack engineer",
    company: "self-employed",
    period: "9/2024 - present",
    description: "building own projects and freelancing for clients.",
    technologies: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    title: "web developer",
    company: "ikius oy",
    period: "2/2023 - 9/2024",
    description:
      "Developed web applications and digital solutions for clients. Worked with modern web technologies to build scalable and maintainable applications.",
    technologies: ["Next.js", "TypeScript", "React", "Node.js"],
  },
  {
    title: "co-founder",
    company: "luxmarketfin clothing & accessories llc",
    period: "5/2024 - present",
    description:
      "Co-founded a pre-loved luxury clothing and accessories brand. Managing e-commerce operations and digital presence.",
  },
];

export type Tab = "projects" | "experience" | "blog";

export function normalizeTab(tab: string | null): Tab {
  if (tab === "experience" || tab === "blog") {
    return tab;
  }
  return "projects";
}
