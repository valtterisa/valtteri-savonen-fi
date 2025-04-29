export const seo = ({
  title,
  description,
  keywords,
  image = "/og-image.png",
  url = "https://valtterisavonen.fi",
  author = "Valtteri Savonen",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
  author?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: author },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "English" },
    { name: "revisit-after", content: "7 days" },

    // Open Graph tags
    { name: "og:site_name", content: "Valtteri Savonen" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:url", content: url },
    { name: "og:type", content: "website" },

    // Twitter tags
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@vvaltterisa" },
    { name: "twitter:site", content: "@vvaltterisa" },

    // Add canonical URL
    { tagName: "link", rel: "canonical", href: url },

    ...(image
      ? [
          { name: "og:image", content: image },
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ name: "twitter:card", content: "summary" }]),
  ];

  return tags;
};
