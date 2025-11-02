export const seo = ({
  title,
  description,
  keywords,
  image,
  url = "https://valtterisavonen.fi",
  author = "Valtteri Savonen",
  type = "website",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
  author?: string;
  type?: string;
}) => {
  const fullTitle = title.includes("Valtteri Savonen") ? title : `${title} | Valtteri Savonen`;
  const tags = [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: author },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "revisit-after", content: "7 days" },

    { property: "og:site_name", content: "Valtteri Savonen" },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:locale", content: "en_US" },

    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@valtterisavonen" },
    { name: "twitter:site", content: "@valtterisavonen" },

    ...(image
      ? [
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:alt", content: fullTitle },
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ name: "twitter:card", content: "summary" }]),
  ];

  return tags;
};
