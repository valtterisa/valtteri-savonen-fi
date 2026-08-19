import type { Tab } from "./content";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  ogImageUrl,
} from "./site";

export type SeoData = {
  title: string;
  description: string;
  keywords?: string;
  image: string;
  url: string;
  type: "website" | "article";
  canonical: string;
  jsonLd?: Record<string, unknown>;
  articlePublished?: string;
  articleAuthor?: string;
  noindex?: boolean;
};

function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: "Software Engineer",
    url: SITE_URL,
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
  };
}

export function homeSeo(): SeoData {
  return {
    title: `${SITE_NAME} - Software Engineer`,
    description: DEFAULT_DESCRIPTION,
    keywords:
      "Valtteri Savonen, full stack engineer, software engineer, web development, Next.js, TypeScript, Finland, quickshops.app, drophost.space, floras.app",
    image: ogImageUrl("/og/home.png"),
    url: SITE_URL,
    type: "website",
    canonical: SITE_URL,
    jsonLd: personJsonLd(),
  };
}

export function tabSeo(tab: Tab): SeoData {
  if (tab === "blog") {
    return blogTabSeo();
  }

  if (tab === "experience") {
    return {
      title: `Experience - ${SITE_NAME}`,
      description:
        "Work experience and background of Valtteri Savonen, full stack software engineer from Finland.",
      image: ogImageUrl("/og/home.png"),
      url: absoluteUrl("/?tab=experience"),
      type: "website",
      canonical: absoluteUrl("/?tab=experience"),
      jsonLd: personJsonLd(),
    };
  }

  return {
    ...homeSeo(),
    title: `Projects - ${SITE_NAME}`,
    description:
      "Projects by Valtteri Savonen including quickshops.app, drophost.space, floras.app, and haalarikone.fi.",
    url: absoluteUrl("/?tab=projects"),
    canonical: absoluteUrl("/?tab=projects"),
  };
}

export function blogTabSeo(): SeoData {
  return {
    title: `Blog - ${SITE_NAME}`,
    description:
      "Blog posts by Valtteri Savonen about software engineering, products, and building on the web.",
    keywords:
      "Valtteri Savonen blog, software engineering blog, web development, TypeScript, Next.js",
    image: ogImageUrl("/og/blog.png"),
    url: absoluteUrl("/?tab=blog"),
    type: "website",
    canonical: absoluteUrl("/?tab=blog"),
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: absoluteUrl("/?tab=blog"),
      author: {
        "@type": "Person",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  };
}

export function blogPostSeo(
  slug: string,
  post: {
    title: string;
    description: string;
    publishedAt: string;
  },
  authorName: string,
): SeoData {
  const description =
    post.description ||
    `Read "${post.title}" on ${SITE_NAME}'s blog.`;
  const url = absoluteUrl(`/blog/${slug}`);

  const jsonLd = post.publishedAt
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description,
        author: {
          "@type": "Person",
          name: authorName,
          url: SITE_URL,
        },
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        url,
        mainEntityOfPage: url,
        image: ogImageUrl(`/og/blog/${slug}.png`),
        publisher: {
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
        },
      }
    : undefined;

  return {
    title: `${post.title} - ${SITE_NAME}`,
    description,
    image: ogImageUrl(`/og/blog/${slug}.png`),
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
    title: `Not Found - ${SITE_NAME}`,
    description: "The page you are looking for could not be found.",
    url: absoluteUrl(path),
    type: "website",
    canonical: absoluteUrl(path),
    image: ogImageUrl("/og/home.png"),
    noindex: true,
  };
}

export function blogNotFoundSeo(slug: string): SeoData {
  return {
    title: `Post Not Found - ${SITE_NAME}`,
    description: "The requested blog post could not be found.",
    url: absoluteUrl(`/blog/${slug}`),
    type: "website",
    canonical: absoluteUrl(`/blog/${slug}`),
    image: ogImageUrl("/og/blog.png"),
    noindex: true,
  };
}
