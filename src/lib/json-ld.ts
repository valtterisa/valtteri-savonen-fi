import {
  BIO,
  JOB_TITLE,
  LANGUAGES,
  LOCATION_COUNTRY,
  LOCATION_COUNTRY_CODE,
  SKILLS,
  getAllWorkCards,
} from "./profile";
import {
  PERSON_ID,
  PROFILE_IMAGE_PATH,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "./site";

type SchemaContext = "https://schema.org";

export type PostalAddressJsonLd = {
  "@type": "PostalAddress";
  addressCountry: string;
};

export type LanguageJsonLd = {
  "@type": "Language";
  name: string;
  alternateName: string;
};

export type CountryJsonLd = {
  "@type": "Country";
  name: string;
};

export type PersonRefJsonLd = {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
};

export type PersonJsonLd = {
  "@context"?: SchemaContext;
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  image: string;
  description: string;
  jobTitle: string;
  knowsAbout: string[];
  knowsLanguage: LanguageJsonLd[];
  nationality: CountryJsonLd;
  address: PostalAddressJsonLd;
  sameAs: string[];
};

export type ProfilePageJsonLd = {
  "@type": "ProfilePage";
  "@id": string;
  url: string;
  name: string;
  mainEntity: { "@id": string };
};

export type SoftwareApplicationJsonLd = {
  "@type": "SoftwareApplication";
  name: string;
  url?: string;
  description: string;
  applicationCategory: "WebApplication";
};

export type ListItemJsonLd = {
  "@type": "ListItem";
  position: number;
  item: SoftwareApplicationJsonLd;
};

export type ItemListJsonLd = {
  "@type": "ItemList";
  name: string;
  itemListElement: ListItemJsonLd[];
};

export type JsonLdGraph = {
  "@context": SchemaContext;
  "@graph": Array<ProfilePageJsonLd | PersonJsonLd | ItemListJsonLd>;
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

export type JsonLd = PersonJsonLd | BlogJsonLd | BlogPostingJsonLd | JsonLdGraph;

function personRef(): PersonRefJsonLd {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function createPersonJsonLd(): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    url: SITE_URL,
    image: absoluteUrl(PROFILE_IMAGE_PATH),
    description: BIO,
    jobTitle: JOB_TITLE,
    knowsAbout: [...SKILLS],
    knowsLanguage: LANGUAGES.map((language) => ({
      "@type": "Language",
      name: language.name,
      alternateName: language.code,
    })),
    nationality: {
      "@type": "Country",
      name: LOCATION_COUNTRY,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: LOCATION_COUNTRY_CODE,
    },
    sameAs: SAME_AS,
  };
}

function createProjectListJsonLd(): ItemListJsonLd {
  return {
    "@type": "ItemList",
    name: "Products & Projects",
    itemListElement: getAllWorkCards().map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        url: project.url,
        description: project.blurb,
        applicationCategory: "WebApplication",
      },
    })),
  };
}

export function createHomeJsonLd(): JsonLdGraph {
  const person = createPersonJsonLd();
  const { "@context": _context, ...personNode } = person;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_NAME,
        mainEntity: { "@id": PERSON_ID },
      },
      personNode,
      createProjectListJsonLd(),
    ],
  };
}

export function createBlogJsonLd(blogUrl: string): BlogJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    url: blogUrl,
    author: personRef(),
  };
}

export function createBlogPostingJsonLd(input: {
  title: string;
  description: string;
  authorName: string;
  publishedAt: string;
  updatedAt?: string;
  url: string;
  image: string;
}): BlogPostingJsonLd {
  const author = personRef();
  if (input.authorName !== SITE_NAME) {
    author.name = input.authorName;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    author,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    url: input.url,
    mainEntityOfPage: input.url,
    image: input.image,
    publisher: personRef(),
  };
}
