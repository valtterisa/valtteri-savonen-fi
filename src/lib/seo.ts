import type { Tab } from "./content";
import type { JsonLd } from "./jsonLd";
import {
  createBlogJsonLd,
  createBlogPostingJsonLd,
  createPersonJsonLd,
} from "./jsonLd";
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
  jsonLd?: JsonLd;
  articlePublished?: string;
  articleAuthor?: string;
  noindex?: boolean;
};

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
    jsonLd: createPersonJsonLd(),
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
      jsonLd: createPersonJsonLd(),
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
  const blogUrl = absoluteUrl("/?tab=blog");

  return {
    title: `Blog - ${SITE_NAME}`,
    description:
      "Blog posts by Valtteri Savonen about software engineering, products, and building on the web.",
    keywords:
      "Valtteri Savonen blog, software engineering blog, web development, TypeScript, Next.js",
    image: ogImageUrl("/og/blog.png"),
    url: blogUrl,
    type: "website",
    canonical: blogUrl,
    jsonLd: createBlogJsonLd(blogUrl),
  };
}

export type BlogPostSeoInput = {
  title: string;
  description: string;
  publishedAt: string;
};

export function blogPostSeo(
  slug: string,
  post: BlogPostSeoInput,
  authorName: string,
): SeoData {
  const description =
    post.description || `Read "${post.title}" on ${SITE_NAME}'s blog.`;
  const url = absoluteUrl(`/blog/${slug}`);
  const image = ogImageUrl(`/og/blog/${slug}.png`);

  const jsonLd = post.publishedAt
    ? createBlogPostingJsonLd({
        title: post.title,
        description,
        authorName,
        publishedAt: post.publishedAt,
        url,
        image,
      })
    : undefined;

  return {
    title: `${post.title} - ${SITE_NAME}`,
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
