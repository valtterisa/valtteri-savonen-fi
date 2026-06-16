import { Link } from "@tanstack/react-router";

type Post = {
  title?: string;
  publishedAt?: string;
  slug: string;
};

type BlogTabProps = {
  posts: Post[];
};

export function BlogTab({ posts }: BlogTabProps) {


  if (posts?.length === 0) {
    return (
      <div className="text-gray-400">No blog posts, yet.</div>
    );
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.slug} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500"
          />
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <span className="text-base font-medium text-white lowercase">
              {post.title || "Untitled Post"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
