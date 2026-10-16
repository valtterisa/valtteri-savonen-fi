import { useState } from "react";
import { cn } from "@/lib/utils";

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  publishedDisplay: string;
  tags: string[];
};

type BlogPostLinkProps = {
  post: BlogPostSummary;
};

function BlogPostLink({ post }: BlogPostLinkProps) {
  const title = post.title || "Untitled Post";

  return (
    <article className="py-5 first:pt-0 last:pb-0">
      <a
        href={`/blog/${post.slug}`}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        {post.publishedDisplay ? (
          <time
            dateTime={post.publishedAt}
            className="font-mono text-xs tracking-wide text-muted-foreground lowercase"
          >
            {post.publishedDisplay}
          </time>
        ) : null}

        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-foreground underline-offset-4 group-hover:underline">
          {title}
        </h3>

        {post.tags.length > 0 ? (
          <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
            {post.tags.join(" / ")}
          </p>
        ) : null}
      </a>
    </article>
  );
}

type FeaturedPostProps = {
  post: BlogPostSummary;
};

function FeaturedPost({ post }: FeaturedPostProps) {
  const title = post.title || "Untitled Post";
  const hasCover = Boolean(post.coverImage);

  return (
    <a
      href={`/blog/${post.slug}`}
      className={cn(
        "group block overflow-hidden rounded-lg border border-border bg-muted/30 outline-none",
        "transition-colors hover:border-foreground/20",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {hasCover ? (
        <div className="aspect-[2.2/1] overflow-hidden border-b border-border bg-muted">
          <img
            src={post.coverImage}
            alt=""
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      ) : null}

      <div className="px-4 py-5 sm:px-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-xs tracking-wide text-muted-foreground lowercase">
            latest
          </span>
          {post.publishedDisplay ? (
            <time
              dateTime={post.publishedAt}
              className="font-mono text-xs tracking-wide text-muted-foreground lowercase"
            >
              {post.publishedDisplay}
            </time>
          ) : null}
        </div>

        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
          <span className="underline-offset-4 group-hover:underline">{title}</span>
        </h3>

        {post.description ? (
          <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {post.description}
          </p>
        ) : null}

        {post.tags.length > 0 ? (
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {post.tags.join(" / ")}
          </p>
        ) : null}
      </div>
    </a>
  );
}

type TagFilterProps = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
};

function TagFilter({ tags, active, onChange }: TagFilterProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      role="tablist"
      aria-label="Filter posts by tag"
      className="flex flex-wrap gap-x-1 gap-y-1"
    >
      <FilterChip
        label="all"
        selected={active === null}
        onClick={() => onChange(null)}
      />
      {tags.map((tag) => (
        <FilterChip
          key={tag}
          label={tag}
          selected={active === tag}
          onClick={() => onChange(tag)}
        />
      ))}
    </div>
  );
}

type FilterChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

function FilterChip({ label, selected, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 font-mono text-xs lowercase tracking-wide transition-colors",
        "outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function sortByPublishedDesc(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

function collectTags(posts: BlogPostSummary[]): string[] {
  const seen = new Set<string>();
  const tags: string[] = [];

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        tags.push(tag);
      }
    }
  }

  return tags.sort((a, b) => a.localeCompare(b));
}

type BlogPanelProps = {
  posts: BlogPostSummary[];
  failed: boolean;
};

export function BlogPanel({ posts, failed }: BlogPanelProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  if (failed) {
    return (
      <p className="text-sm text-muted-foreground">
        couldn’t load blog posts.
      </p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">no blog posts, yet.</p>
    );
  }

  const sorted = sortByPublishedDesc(posts);
  const tags = collectTags(sorted);
  const filtered = activeTag
    ? sorted.filter((post) =>
        post.tags.some(
          (tag) => tag.toLowerCase() === activeTag.toLowerCase(),
        ),
      )
    : sorted;
  const [featured, ...rest] = filtered;

  return (
    <div className="flex w-full flex-col gap-6">
      <TagFilter tags={tags} active={activeTag} onChange={setActiveTag} />

      {featured ? <FeaturedPost post={featured} /> : null}

      {rest.length > 0 ? (
        <div className="divide-y divide-border">
          {rest.map((post) => (
            <BlogPostLink key={post.id} post={post} />
          ))}
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          no posts with that tag.
        </p>
      ) : null}
    </div>
  );
}
