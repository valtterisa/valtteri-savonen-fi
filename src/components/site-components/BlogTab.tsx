import { Link } from "@tanstack/react-router";

type Post = {
  title: string;
  date: string;
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
      slug,
      status: meta.status || "published",
    } as Post;
  })
  .filter((post) => post.status !== "draft")
  .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

export function BlogTab() {
  if (posts.length === 0) {
    return (
      <div className="text-gray-400">No blog posts, yet.</div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="block text-gray-400 hover:text-white transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {post.title}
              </h3>
              {post.date && (
                <p className="text-sm text-gray-500">{post.date}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
