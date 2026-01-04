import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { getSinglePost } from "../utils/marble-query";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await getSinglePost(params.slug);
    return data;
  },
  head: ({ loaderData, params }) => {
    const { slug } = params;
    const post = loaderData?.post || loaderData;

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

    const description =
      post.content?.replace(/[#*`]/g, "").substring(0, 160).trim() || "";

    return {
      meta: [
        ...seo({
          title: post.title || "Blog Post",
          description: description || "A blog post by Valtteri Savonen",
          image: "https://valtterisavonen.fi/og-image.png",
          url: `https://valtterisavonen.fi/blog/${slug}`,
          type: "article",
        }),
        ...(post.publishedAt
          ? [
            { property: "article:published_time", content: post.publishedAt },
            { property: "article:author", content: "Valtteri Savonen" },
          ]
          : []),
      ],
      links: [
        { rel: "canonical", href: `https://valtterisavonen.fi/blog/${slug}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title || "Blog Post",
            description: description || "A blog post by Valtteri Savonen",
            author: {
              "@type": "Person",
              name: "Valtteri Savonen",
              url: "https://valtterisavonen.fi",
            },
            datePublished: post.publishedAt || undefined,
            url: `https://valtterisavonen.fi/blog/${slug}`,
            publisher: {
              "@type": "Person",
              name: "Valtteri Savonen",
            },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const loaderData = useLoaderData({ from: "/blog/$slug" });
  const post = loaderData?.post || loaderData;

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
        <div className="max-w-xl mx-auto pt-8">
          <p className="text-gray-400">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10 sm:py-12 px-4 sm:px-8 md:px-16 relative">
      <Link
        to="/"
        search={{ tab: "blog" }}
        className="absolute top-6 left-6 text-gray-400 text-sm hover:text-white transition-colors"
      >
        ← Back to homepage
      </Link>

      <div className="max-w-xl mx-auto pt-8">
        <h1>{post.title}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
