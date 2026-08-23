import { Stack } from "../ui/Stack";

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
};

type BlogPostLinkProps = {
  post: BlogPostSummary;
};

function BlogPostLink({ post }: BlogPostLinkProps) {
  return (
    <Stack.Item className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
      />
      <a
        href={`/blog/${post.slug}`}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <span className="text-base font-medium text-foreground lowercase">
          {post.title || "Untitled Post"}
        </span>
      </a>
    </Stack.Item>
  );
}

type BlogPanelProps = {
  posts: BlogPostSummary[];
  failed: boolean;
};

export function BlogPanel({ posts, failed }: BlogPanelProps) {
  if (failed) {
    return <div className="text-muted-foreground">couldn’t load blog posts.</div>;
  }

  if (posts.length === 0) {
    return <div className="text-muted-foreground">no blog posts, yet.</div>;
  }

  return (
    <Stack.Root className="space-y-3">
      {posts.map((post) => (
        <BlogPostLink key={post.id} post={post} />
      ))}
    </Stack.Root>
  );
}
