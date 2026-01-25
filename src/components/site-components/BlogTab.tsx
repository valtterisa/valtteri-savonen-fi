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
    <div className="space-y-6">
      {posts?.map((post) => (
        <Link
          key={post.slug}
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="block text-gray-400 hover:text-white transition-colors"
        >
              <h3 className="text-lg font-semibold text-white mb-1 lowercase">
                {post.title || "Untitled Post"}
              </h3>
        </Link>
      ))}
    </div>
  );
}
