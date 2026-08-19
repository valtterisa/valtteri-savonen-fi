import { SITE_NAME, SITE_URL } from "./site";

type SchemaContext = "https://schema.org";

export type PostalAddressJsonLd = {
  "@type": "PostalAddress";
  addressCountry: string;
};

export type PersonRefJsonLd = {
  "@type": "Person";
  name: string;
  url: string;
};

export type PersonJsonLd = {
  "@context": SchemaContext;
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  sameAs: string[];
  address: PostalAddressJsonLd;
};

export type BlogJsonLd = {
  "@context": SchemaContext;
  "@type": "Blog";
  name: string;
  url: string;
  author: PersonRefJsonLd;
};

export type BlogPostingJsonLd = {
  "@context": SchemaContext;
  "@type": "BlogPosting";
  headline: string;
  description: string;
  author: PersonRefJsonLd;
  datePublished: string;
  dateModified: string;
  url: string;
  mainEntityOfPage: string;
  image: string;
  publisher: PersonRefJsonLd;
};

export type JsonLd = PersonJsonLd | BlogJsonLd | BlogPostingJsonLd;

export function createPersonJsonLd(): PersonJsonLd {
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

export function createBlogJsonLd(blogUrl: string): BlogJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: blogUrl,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function createBlogPostingJsonLd(input: {
  title: string;
  description: string;
  authorName: string;
  publishedAt: string;
  url: string;
  image: string;
}): BlogPostingJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    author: {
      "@type": "Person",
      name: input.authorName,
      url: SITE_URL,
    },
    datePublished: input.publishedAt,
    dateModified: input.publishedAt,
    url: input.url,
    mainEntityOfPage: input.url,
    image: input.image,
    publisher: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
