import { createFileRoute, Link } from "@tanstack/react-router";
import { renderMarkdown } from "../utils/renderMarkdown";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const { slug } = params;
    const post = posts.find((p) => p.slug === slug);
    
    if (!post) {
      return {
        meta: [
          ...seo({
            title: "Post Not Found",
            description: "The requested blog post could not be found.",
            url: `https://valtterisavonen.fi/blog/${slug}`,
          }),
        ],
      };
    }

    const description = post.content
      .replace(/[#*`]/g, "")
      .substring(0, 160)
      .trim();

    return {
      meta: [
        ...seo({
          title: post.title,
          description: description || "A blog post by Valtteri Savonen",
          image: "https://valtterisavonen.fi/og-image.png",
          url: `https://valtterisavonen.fi/blog/${slug}`,
          type: "article",
        }),
        ...(post.date
          ? [
              { property: "article:published_time", content: post.date },
              { property: "article:author", content: "Valtteri Savonen" },
            ]
          : []),
      ],
      links: [
        { rel: "canonical", href: `https://valtterisavonen.fi/blog/${slug}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: description || "A blog post by Valtteri Savonen",
            author: {
              "@type": "Person",
              name: "Valtteri Savonen",
              url: "https://valtterisavonen.fi",
            },
            datePublished: post.date || undefined,
            url: `https://valtterisavonen.fi/blog/${slug}`,
            publisher: {
              "@type": "Person",
              name: "Valtteri Savonen",
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

type Post = {
  title: string;
  date: string;
  content: string;
  slug: string;
  status?: string;
};

function parseFrontmatter(raw: string): { meta: Partial<Post>; body: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = raw.match(frontmatterRegex);

  if (!match) {
    return { meta: {}, body: raw };
  }

  const frontmatterText = match[1];
  const fm = frontmatterText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, line) => {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const key = line.slice(0, idx).trim();
        const value = line
          .slice(idx + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        acc[key] = value;
      }
      return acc;
    }, {});

  const body = raw.slice(match[0].length).trim();
  return { meta: { title: fm.title, date: fm.date, status: fm.status }, body };
}

const files = import.meta.glob("/src/content/thoughts/**/*.md", {
  as: "raw",
  eager: true,
}) as Record<string, string>;

const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path
      .replace(/\\/g, "/")
      .replace(/^\/src\/content\/thoughts\//, "")
      .replace(/\.md$/, "");
    const { meta, body } = parseFrontmatter(raw);

    const derivedTitle = meta.title || (body.match(/^#\s+(.+)$/m)?.[1] ?? slug);
    const derivedDate = meta.date || "";
    return {
      title: derivedTitle,
      date: derivedDate,
      content: body.trim(),
      slug,
      status: meta.status || "published",
    } as Post;
  })
  .filter((post) => post.status !== "draft")
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

function PostPage() {
  const { slug } = Route.useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-400">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
      <Link
        to="/"
        search={{ tab: "blog" }}
        className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
      >
        ← Back to homepage
      </Link>

      <div className="max-w-xl mx-auto pt-8">
        <article className="prose prose-invert prose-sm max-w-none prose-ul:pl-6 prose-ol:pl-6 prose-li:my-2">
          <h1 className="text-center uppercase text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide">
            {post.title}
          </h1>
          {post.date ? (
            <p className="text-xs text-gray-500 mt-0 text-center">{post.date}</p>
          ) : null}
          <div
            className="prose prose-invert prose-sm prose-pre:max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>
      </div>
    </div>
  );
}