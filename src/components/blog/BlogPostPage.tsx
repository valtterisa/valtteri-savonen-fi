import type { Post } from "../../lib/marble";
import { Article } from "../ui/Article";

type BlogPostPageProps = {
  post: Post;
  authorName: string;
  authorImage: string;
  publishedDisplay: string;
};

export function BlogPostPage({
  post,
  authorName,
  authorImage,
  publishedDisplay,
}: BlogPostPageProps) {
  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
      <a
        href="/?tab=blog"
        className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
      >
        ← Back to homepage
      </a>

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
    </div>
  );
}

type BlogPostNotFoundProps = {
  message?: string;
};

export function BlogPostNotFound({
  message = "Post not found.",
}: BlogPostNotFoundProps) {
  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
      <a
        href="/?tab=blog"
        className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
      >
        ← Back to homepage
      </a>
      <div className="max-w-3xl mx-auto pt-8">
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}
