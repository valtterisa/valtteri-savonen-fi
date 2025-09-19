import { Link, createFileRoute } from "@tanstack/react-router";
import { ThreeBackground } from "~/components/site-components/BackgroundAnimation";

export const Route = createFileRoute("/thoughts/")({
  component: ThoughtsPage,
});

type Post = {
  title: string;
  date: string;
  content: string;
  slug: string;
  status?: string;
};

function parseFrontmatter(raw: string): { meta: Partial<Post>; body: string } {
  // Look for frontmatter between --- markers
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

function ThoughtsPage() {
  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16">
      <ThreeBackground />

      <div className="max-w-3xl mx-auto">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-center uppercase text-3xl sm:text-4xl md:text-6xl pt-6 md:pt-0 font-bold uppercase tracking-wide">
            Thoughts
          </h1>
          <p className="text-gray-400 mt-4 text-center">
            my thoughts on various topics.
          </p>
        </header>
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to="/thoughts/$slug"
                params={{ slug: post.slug }}
                className="block rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="py-4">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {post.title}
                  </h2>
                  {post.date ? (
                    <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                  ) : null}

                  <p className="text-gray-400 text-sm mt-3">Read post →</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-gray-400">No posts found. yet.</div>
        )}
      </div>
    </div>
  );
}
