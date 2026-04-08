import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { getSinglePost } from "../utils/marble-query";
import { seo } from "../utils/seo";
import { Prose } from "../components/Prose";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getSinglePost({ data: params.slug });
    return result;
  },
  headers: () => ({
    "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
  }),
  staleTime: 5 * 60_000,
  gcTime: 10 * 60_000,
  head: ({ loaderData, params }) => {
    const { slug } = params;
    const result = loaderData as { post?: {
      title?: string;
      content?: string;
      publishedAt?: Date | string;
      description?: string;
      coverImage?: string;
      authors?: Array<{ name?: string }>;
    } } | null;
    const post = result?.post;

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

    const publishedAt = post.publishedAt instanceof Date 
      ? post.publishedAt.toISOString() 
      : typeof post.publishedAt === "string" 
      ? post.publishedAt 
      : undefined;
    const authorName = "Valtteri Savonen";

    return {
      meta: [
        ...seo({
          title: post.title?.toLowerCase() || "Blog Post",
          description: post.description?.toLowerCase() || "The requested blog post could not be found.",
          image: post.coverImage || "https://valtterisavonen.fi/og-image.png",
          url: `https://valtterisavonen.fi/blog/${slug}`,
          type: "article",
          appendSiteName: false,
        }),
        ...(publishedAt
          ? [
            { property: "article:published_time", content: publishedAt },
            { property: "article:author", content: authorName },
          ]
          : []),
      ],
      links: [
        { rel: "canonical", href: `https://valtterisavonen.fi/blog/${slug}` },
      ],
      scripts: publishedAt
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title || "Blog Post",
                author: {
                  "@type": "Person",
                  name: authorName,
                  url: "https://valtterisavonen.fi",
                },
                datePublished: publishedAt,
                url: `https://valtterisavonen.fi/blog/${slug}`,
                publisher: {
                  "@type": "Person",
                  name: "Valtteri Savonen",
                },
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
});

function PostPage() {
  const loaderData = useLoaderData({ from: "/blog/$slug" }) as { post?: {
    title?: string;
    content?: string;
    publishedAt?: Date | string;
    updatedAt?: Date | string;
    description?: string;
    coverImage?: string;
    authors?: Array<{ name?: string; image?: string }>;
    category?: { name?: string; slug?: string };
    tags?: Array<{ name?: string; slug?: string }>;
  } } | null;
  
  const post = loaderData?.post;

  if (!post) {
    return (
      <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
        <Link
          to="/"
          search={{ tab: "blog" }}
          className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
        >
          ← Back to homepage
        </Link>
        <div className="max-w-3xl mx-auto pt-8">
          <p className="text-gray-400">Post not found.</p>
        </div>
      </div>
    );
  }

  const publishedAt = post.publishedAt instanceof Date 
    ? post.publishedAt 
    : typeof post.publishedAt === "string" 
    ? new Date(post.publishedAt) 
    : null;

  const authorName = post.authors?.[0]?.name || "Valtteri Savonen";
  const authorImage = post.authors?.[0]?.image;

  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
      <Link
        to="/"
        search={{ tab: "blog" }}
        className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
      >
        ← Back to homepage
      </Link>

      <article className="max-w-3xl mx-auto pt-8">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {post.title?.toLowerCase()}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            {authorImage && (
              <img
                src={authorImage}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <div className="text-white">{authorName}</div>
              {publishedAt && (
                <time dateTime={publishedAt.toISOString()}>
                  {publishedAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs text-gray-400 bg-gray-800 rounded-full"
                >
                  {tag.name || tag.slug}
                </span>
              ))}
            </div>
          )}
        </header>

        <Prose html={post.content || ""} />
      </article>
    </div>
  );
}
