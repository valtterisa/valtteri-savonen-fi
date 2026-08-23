import type { ReactNode } from "react";
import type { Post } from "../../lib/marble";
import { Article } from "../ui/article";
import { SiteShell } from "../ui/site-shell";

type BlogPostPageProps = {
  post: Post;
  authorName: string;
  authorImage: string;
  publishedDisplay: string;
  children?: ReactNode;
};

function PageChrome({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <a
        href="/?tab=blog"
        className="text-muted-foreground text-sm hover:text-foreground transition-colors"
      >
        ← Back to homepage
      </a>
      {children}
    </div>
  );
}

export function BlogPostPage({
  post,
  authorName,
  authorImage,
  publishedDisplay,
  children,
}: BlogPostPageProps) {
  return (
    <SiteShell.Root>
      <SiteShell.Container>
        <PageChrome>{children}</PageChrome>

        <Article.Root>
          <Article.Header>
            <Article.Title>{post.title}</Article.Title>

            <Article.Meta>
              {authorImage && (
                <Article.Avatar src={authorImage} alt={authorName} />
              )}
              <Article.Byline>
                <Article.Author>{authorName}</Article.Author>
                {post.publishedAt && (
                  <Article.Date datetime={post.publishedAt}>
                    {publishedDisplay}
                  </Article.Date>
                )}
              </Article.Byline>
            </Article.Meta>

            {post.tags.length > 0 && (
              <Article.Tags>
                {post.tags.map((tag) => (
                  <Article.Tag key={tag.slug}>{tag.name || tag.slug}</Article.Tag>
                ))}
              </Article.Tags>
            )}
          </Article.Header>

          <Article.Content html={post.content} />
        </Article.Root>
      </SiteShell.Container>
    </SiteShell.Root>
  );
}

type BlogPostNotFoundProps = {
  message?: string;
  children?: ReactNode;
};

export function BlogPostNotFound({
  message = "Post not found.",
  children,
}: BlogPostNotFoundProps) {
  return (
    <SiteShell.Root>
      <SiteShell.Container>
        <PageChrome>{children}</PageChrome>
        <p className="text-muted-foreground">{message}</p>
      </SiteShell.Container>
    </SiteShell.Root>
  );
}
