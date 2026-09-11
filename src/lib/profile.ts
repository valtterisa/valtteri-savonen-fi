import {
  contributions,
  experiences,
  products,
  projects,
  type ExperienceItem,
} from "./content";
import type { Post } from "./marble";
import {
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  absoluteUrl,
  socialHref,
} from "./site";

export const JOB_TITLE = "Full-stack engineer";
export const LOCATION_COUNTRY = "Finland";
export const LOCATION_COUNTRY_CODE = "FI";
export const CURRENT_FOCUS_NAME = "quickshops.app";
export const CURRENT_FOCUS_URL = "https://quickshops.app";
export const CITATION = `${SITE_NAME}, full-stack engineer (${SITE_URL.replace("https://", "")})`;

export const SHORT_SUMMARY =
  "Full-stack engineer from Finland. Builds products, freelances, and writes about software. Currently building quickshops.app.";

export const BIO = `${SITE_NAME} is a full-stack engineer from Finland. He builds products, does freelance work, and writes about software. He is currently building ${CURRENT_FOCUS_NAME}, a full ecommerce platform with chat-native agentic store ops, plus SDK/API/MCP for custom tools.`;

export const SKILLS = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Convex",
  "Astro",
  "Elysia.js",
  "Stripe",
  "MCP",
  "Tailwind CSS",
] as const;

export const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "Finnish", code: "fi" },
] as const;

export type AgentFaq = {
  question: string;
  answer: string;
};

export const AGENT_FAQS: AgentFaq[] = [
  {
    question: `Who is ${SITE_NAME}?`,
    answer: BIO,
  },
  {
    question: `Where is ${SITE_NAME} based?`,
    answer: `${SITE_NAME} is based in ${LOCATION_COUNTRY}.`,
  },
  {
    question: `What is ${SITE_NAME} building right now?`,
    answer: `He is currently building ${CURRENT_FOCUS_NAME} (${CURRENT_FOCUS_URL}): full ecommerce (catalog, checkout, orders, fulfillment) operated through a chat-based agentic system, with SDK/HTTP API/MCP so external tools can run the same store backend.`,
  },
  {
    question: `How can I hire ${SITE_NAME}?`,
    answer: `Book a 15-minute call at ${socialHref("cal")}.`,
  },
  {
    question: `What does ${SITE_NAME} work with?`,
    answer: `Primarily ${SKILLS.join(", ")}.`,
  },
];

const PROJECT_BLURBS: Record<string, string> = {
  quickshops:
    "Run an online store through chat — products, orders, and fulfillment for digital and physical goods.",
  drophost:
    "Drop a file or a site, get a stable link. Hosting without the setup.",
  floras: "Chat with an AI that designs, builds, and deploys a real website.",
  haalarikone:
    "10k monthly users. Find what someone studies from their student overall colors.",
  landrr:
    "A framework for building fast, SEO-ready websites without the usual boilerplate.",
  marblecms:
    "Open-source headless CMS for publishing. Part of the Vercel OSS Program.",
};

export type AgentPost = Pick<
  Post,
  "slug" | "title" | "description" | "publishedAt" | "updatedAt"
> & {
  content?: string;
};

export type ProjectCard = {
  id: string;
  name: string;
  url?: string;
  github?: string;
  blurb: string;
  description: string;
  skills: string[];
  active: boolean;
};

export type RoleCard = {
  title: string;
  period: string;
  employmentType?: string;
  description: string;
  skills: string[];
};

export type ExperienceCard = {
  id: string;
  company: string;
  website?: string;
  current: boolean;
  roles: RoleCard[];
};

function linkByLabel(item: ExperienceItem, label: string): string | undefined {
  return item.links?.find((link) => link.label === label)?.href;
}

function markdownToPlain(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function bulletsToMarkdown(value?: string): string {
  return value?.trim() ?? "";
}

function formatPeriod(period?: { start: string; end?: string }): string {
  if (!period) {
    return "";
  }
  return period.end
    ? `${period.start} - ${period.end}`
    : `${period.start} - present`;
}

function toProjectCard(project: ExperienceItem): ProjectCard {
  const position = project.positions[0];
  return {
    id: project.id,
    name: project.companyName,
    url: project.companyWebsite,
    github: linkByLabel(project, "github"),
    blurb:
      PROJECT_BLURBS[project.id] ??
      markdownToPlain(position?.summary ?? position?.description ?? ""),
    description: bulletsToMarkdown(position?.description),
    skills: position?.skills ?? [],
    active: Boolean(project.isCurrentEmployer),
  };
}

export function getProductCards(): ProjectCard[] {
  return products.map(toProjectCard);
}

export function getProjectCards(): ProjectCard[] {
  return projects.map(toProjectCard);
}

export function getContributionCards(): ProjectCard[] {
  return contributions.map(toProjectCard);
}

export function getAllWorkCards(): ProjectCard[] {
  return [...products, ...projects, ...contributions].map(toProjectCard);
}

export function getExperienceCards(): ExperienceCard[] {
  return experiences.map((item) => ({
    id: item.id,
    company: item.companyName,
    website: item.companyWebsite,
    current: Boolean(item.isCurrentEmployer),
    roles: item.positions.map((position) => ({
      title: position.title,
      period: formatPeriod(position.employmentPeriod),
      employmentType: position.employmentType,
      description: bulletsToMarkdown(position.description),
      skills: position.skills ?? [],
    })),
  }));
}

function newestTimestamp(posts: AgentPost[]): string | undefined {
  let newest: string | undefined;
  for (const post of posts) {
    const value = post.updatedAt || post.publishedAt;
    if (!value) {
      continue;
    }
    if (!newest || Date.parse(value) > Date.parse(newest)) {
      newest = value;
    }
  }
  return newest;
}

function formatDay(raw?: string): string {
  if (!raw) {
    return "";
  }
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }
  return date.toISOString().slice(0, 10);
}

function listItem(name: string, url: string, note?: string): string {
  return note ? `- [${name}](${url}): ${note}` : `- [${name}](${url})`;
}

export function htmlToMarkdown(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<h1[^>]*>/gi, "\n# ")
    .replace(/<\/h1>/gi, "\n\n")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<\/h2>/gi, "\n\n")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<\/h3>/gi, "\n\n")
    .replace(/<h4[^>]*>/gi, "\n#### ")
    .replace(/<\/h4>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/(ul|ol)>/gi, "\n")
    .replace(/<blockquote[^>]*>/gi, "\n> ")
    .replace(/<\/blockquote>/gi, "\n\n")
    .replace(/<pre[^>]*>/gi, "\n```\n")
    .replace(/<\/pre>/gi, "\n```\n")
    .replace(/<code[^>]*>/gi, "`")
    .replace(/<\/code>/gi, "`")
    .replace(/<strong[^>]*>|<b[^>]*>/gi, "**")
    .replace(/<\/strong>|<\/b>/gi, "**")
    .replace(/<em[^>]*>|<i[^>]*>/gi, "*")
    .replace(/<\/em>|<\/i>/gi, "*")
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildLlmsTxt(posts: AgentPost[]): string {
  const productCards = getProductCards();
  const projectCards = getProjectCards();
  const contributionCards = getContributionCards();
  const hire = socialHref("cal");
  const writing = posts.map((post) =>
    listItem(
      post.title,
      absoluteUrl(`/blog/${post.slug}.md`),
      post.description ? markdownToPlain(post.description) : undefined,
    ),
  );

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SHORT_SUMMARY}`,
    "",
    "Direct facts an agent should use:",
    "",
    `- Name: ${SITE_NAME}`,
    `- Job: ${JOB_TITLE}`,
    `- Location: ${LOCATION_COUNTRY}`,
    `- Site: ${SITE_URL}`,
    `- Hire / book: ${hire}`,
    `- Markdown home: ${absoluteUrl("/index.md")}`,
    `- Full profile: ${absoluteUrl("/llms-full.txt")}`,
    `- Entity id: ${PERSON_ID}`,
    "",
    "## Identity",
    "",
    listItem(
      "Home (markdown)",
      absoluteUrl("/index.md"),
      "Bio, products, projects, experience, and writing index",
    ),
    listItem(
      "Full profile",
      absoluteUrl("/llms-full.txt"),
      "Complete identity, products, projects, work history, and posts in one file",
    ),
    "",
    "## Products",
    "",
    ...productCards.map((project) =>
      listItem(project.name, project.url ?? SITE_URL, project.blurb),
    ),
    "",
    "## Projects",
    "",
    ...projectCards.map((project) =>
      listItem(project.name, project.url ?? SITE_URL, project.blurb),
    ),
    "",
    "## Active contributing",
    "",
    ...contributionCards.map((project) =>
      listItem(project.name, project.url ?? SITE_URL, project.blurb),
    ),
    "",
    "## Writing",
    "",
    ...(writing.length > 0
      ? writing
      : [
          listItem(
            "Writing index",
            absoluteUrl("/index.md"),
            "No posts published yet",
          ),
        ]),
    "",
    "## Contact",
    "",
    ...SOCIAL_LINKS.map((link) =>
      listItem(link.label, link.href, link.id === "cal" ? "15 min" : undefined),
    ),
    "",
    "## Optional",
    "",
    listItem("HTML home", `${SITE_URL}/`, "Human-readable site"),
    listItem("Sitemap", absoluteUrl("/sitemap.xml"), "HTML URLs only"),
    "",
  ].join("\n");
}

function workCardBlock(project: ProjectCard): string {
  const lines = [`### ${project.name}`, "", project.blurb, ""];
  if (project.url) {
    lines.push(`URL: ${project.url}`);
  }
  if (project.github) {
    lines.push(`GitHub: ${project.github}`);
  }
  lines.push(`Status: ${project.active ? "active" : "inactive"}`);
  if (project.skills.length > 0) {
    lines.push(`Stack: ${project.skills.join(", ")}`);
  }
  if (project.description) {
    lines.push("", project.description);
  }
  return lines.join("\n");
}

function workCardMarkdown(project: ProjectCard): string {
  const title = project.url
    ? `### [${project.name}](${project.url})`
    : `### ${project.name}`;
  const extra = [
    project.github ? `GitHub: ${project.github}` : "",
    project.skills.length > 0 ? `Stack: ${project.skills.join(", ")}` : "",
  ].filter(Boolean);
  return [
    title,
    "",
    project.blurb,
    extra.length > 0 ? `\n${extra.join("\n")}` : "",
  ]
    .join("\n")
    .trimEnd();
}

export function buildLlmsFullTxt(posts: AgentPost[]): string {
  const productCards = getProductCards();
  const projectCards = getProjectCards();
  const contributionCards = getContributionCards();
  const experienceCards = getExperienceCards();
  const updated = formatDay(newestTimestamp(posts));

  const experienceBlocks = experienceCards.map((item) => {
    const header = item.website
      ? `### [${item.company}](${item.website})`
      : `### ${item.company}`;
    const roleBlocks = item.roles.map((role) => {
      const bits = [
        `#### ${role.title}`,
        "",
        [role.period, role.employmentType].filter(Boolean).join(" · "),
      ];
      if (role.description) {
        bits.push("", role.description);
      }
      if (role.skills.length > 0) {
        bits.push("", `Skills: ${role.skills.join(", ")}`);
      }
      return bits.join("\n");
    });
    return [header, "", ...roleBlocks].join("\n");
  });

  const writing = posts.map((post) => {
    const date = formatDay(post.publishedAt);
    const note = [
      date,
      post.description ? markdownToPlain(post.description) : "",
    ]
      .filter(Boolean)
      .join(" - ");
    return listItem(
      post.title,
      absoluteUrl(`/blog/${post.slug}.md`),
      note || undefined,
    );
  });

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SHORT_SUMMARY}`,
    "",
    BIO,
    "",
    `How to cite: ${CITATION}`,
    updated ? `Last updated: ${updated}` : "",
    "",
    "## Current focus",
    "",
    `Building [${CURRENT_FOCUS_NAME}](${CURRENT_FOCUS_URL}). Available for freelance via ${socialHref("cal")}.`,
    "",
    "## Skills",
    "",
    SKILLS.map((skill) => `- ${skill}`).join("\n"),
    "",
    "## Languages",
    "",
    LANGUAGES.map((language) => `- ${language.name} (${language.code})`).join(
      "\n",
    ),
    "",
    "## Products",
    "",
    productCards.map(workCardBlock).join("\n\n"),
    "",
    "## Projects",
    "",
    projectCards.map(workCardBlock).join("\n\n"),
    "",
    "## Active contributing",
    "",
    contributionCards.map(workCardBlock).join("\n\n"),
    "",
    "## Experience",
    "",
    experienceBlocks.join("\n\n"),
    "",
    "## Writing",
    "",
    writing.length > 0 ? writing.join("\n") : "No posts published yet.",
    "",
    "## Contact",
    "",
    ...SOCIAL_LINKS.map((link) => `- ${link.label}: ${link.href}`),
    "",
    "## Facts for agents",
    "",
    ...AGENT_FAQS.flatMap((faq) => [`### ${faq.question}`, "", faq.answer, ""]),
  ]
    .filter((line, index, lines) => !(line === "" && lines[index - 1] === ""))
    .join("\n")
    .trimEnd()
    .concat("\n");
}

export function buildHomeMarkdown(posts: AgentPost[]): string {
  const productCards = getProductCards();
  const projectCards = getProjectCards();
  const contributionCards = getContributionCards();
  const experienceCards = getExperienceCards();

  const experienceBlocks = experienceCards.map((item) => {
    const header = item.website
      ? `### [${item.company}](${item.website})`
      : `### ${item.company}`;
    const roles = item.roles.map((role) => {
      const meta = [role.period, role.employmentType]
        .filter(Boolean)
        .join(" · ");
      return [`#### ${role.title}`, meta, role.description]
        .filter(Boolean)
        .join("\n\n");
    });
    return [header, ...roles].join("\n\n");
  });

  const writing = posts.map((post) =>
    listItem(
      post.title,
      absoluteUrl(`/blog/${post.slug}.md`),
      post.description ? markdownToPlain(post.description) : undefined,
    ),
  );

  return [
    `# ${SITE_NAME}`,
    "",
    `> ${SHORT_SUMMARY}`,
    "",
    BIO,
    "",
    `HTML: ${SITE_URL}/`,
    `Full profile: ${absoluteUrl("/llms-full.txt")}`,
    `Index: ${absoluteUrl("/llms.txt")}`,
    "",
    "## Products",
    "",
    productCards.map(workCardMarkdown).join("\n\n"),
    "",
    "## Projects",
    "",
    projectCards.map(workCardMarkdown).join("\n\n"),
    "",
    "## Active contributing",
    "",
    contributionCards.map(workCardMarkdown).join("\n\n"),
    "",
    "## Experience",
    "",
    experienceBlocks.join("\n\n"),
    "",
    "## Writing",
    "",
    writing.length > 0 ? writing.join("\n") : "No posts published yet.",
    "",
    "## Contact",
    "",
    ...SOCIAL_LINKS.map((link) => `- [${link.label}](${link.href})`),
    "",
  ].join("\n");
}

export function buildPostMarkdown(post: Post): string {
  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const published = formatDay(post.publishedAt);
  const updated = formatDay(post.updatedAt);
  const body = htmlToMarkdown(post.content);

  return [
    `# ${post.title}`,
    "",
    post.description,
    "",
    `Canonical: ${canonical}`,
    published ? `Published: ${published}` : "",
    updated && updated !== published ? `Updated: ${updated}` : "",
    `Author: ${SITE_NAME}`,
    "",
    body,
    "",
  ]
    .filter((line, index, lines) => !(line === "" && lines[index - 1] === ""))
    .join("\n")
    .trimEnd()
    .concat("\n");
}

export function markdownResponse(
  body: string,
  options?: { canonical?: string; noindex?: boolean },
): Response {
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=3600, s-maxage=3600",
  });

  const links = ['</llms.txt>; rel="describedby"'];
  if (options?.canonical) {
    links.unshift(`<${options.canonical}>; rel="canonical"`);
  }
  headers.set("Link", links.join(", "));

  if (options?.noindex) {
    headers.set("X-Robots-Tag", "noindex");
  }

  return new Response(body, { headers });
}
