export type SeoData = {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url: string;
  type: "website" | "article";
  canonical?: string;
  jsonLd?: Record<string, unknown>;
  articlePublished?: string;
  articleAuthor?: string;
};

export function homeSeo(): SeoData {
  return {
    title: "Valtteri Savonen - Software Engineer",
    description:
      "Full Stack Engineer from Finland. Working for myself, looking for startup ideas, building and doing work for clients. Specializing in Next.js, TypeScript, and modern web technologies.",
    keywords:
      "Valtteri Savonen, full stack engineer, software engineer, web development, Next.js, TypeScript, Finland, floras.app",
    image: "https://valtterisavonen.fi/og-image.png",
    url: "https://valtterisavonen.fi",
    type: "website",
    canonical: "https://valtterisavonen.fi",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Valtteri Savonen",
      jobTitle: "Software Engineer",
      url: "https://valtterisavonen.fi",
      sameAs: [
        "https://cal.com/valtterisa/15min",
        "https://github.com/valtterisa",
        "https://x.com/vvaltterisa",
        "https://linkedin.com/in/valtterisavonen",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "FI",
      },
    },
  };
}

export function blogPostSeo(
  slug: string,
  post: {
    title: string;
    description: string;
    coverImage: string;
    publishedAt: string;
  },
  authorName: string,
): SeoData {
  const title = post.title.toLowerCase();
  const description = (post.description || post.title).toLowerCase();
  const image = post.coverImage || "https://valtterisavonen.fi/og-image.png";
  const url = `https://valtterisavonen.fi/blog/${slug}`;

  const jsonLd = post.publishedAt
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        author: {
          "@type": "Person",
          name: authorName,
          url: "https://valtterisavonen.fi",
        },
        datePublished: post.publishedAt,
        url,
        publisher: {
          "@type": "Person",
          name: "Valtteri Savonen",
        },
      }
    : undefined;

  return {
    title,
    description,
    image,
    url,
    type: "article",
    canonical: url,
    jsonLd,
    articlePublished: post.publishedAt,
    articleAuthor: authorName,
  };
}

export function notFoundSeo(path: string): SeoData {
  return {
    title: "Not Found",
    description: "Page not found",
    url: `https://valtterisavonen.fi${path}`,
    type: "website",
    image: "https://valtterisavonen.fi/og-image.png",
  };
}

export function blogNotFoundSeo(slug: string): SeoData {
  return {
    title: "Post Not Found",
    description: "The requested blog post could not be found.",
    url: `https://valtterisavonen.fi/blog/${slug}`,
    type: "website",
    canonical: `https://valtterisavonen.fi/blog/${slug}`,
    image: "https://valtterisavonen.fi/og-image.png",
  };
}
