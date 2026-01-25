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
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {post.title || "Untitled Post"}
              </h3>
              {post.publishedAt && (
                <p className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
