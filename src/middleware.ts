import { defineMiddleware } from "astro:middleware";

function describedByLink(): string {
  return '</llms.txt>; rel="describedby"';
}

function alternateMarkdown(path: string): string {
  return `<${path}>; rel="alternate"; type="text/markdown"`;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = context.url;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/og/") ||
    pathname.endsWith(".txt") ||
    pathname.endsWith(".md") ||
    pathname.endsWith(".xml")
  ) {
    return response;
  }

  const links = [describedByLink()];

  if (pathname === "/") {
    links.push(alternateMarkdown("/index.md"));
  } else if (pathname.startsWith("/blog/") && pathname !== "/blog/") {
    links.push(alternateMarkdown(`${pathname}.md`));
  }

  const headers = new Headers(response.headers);
  const existing = headers.get("Link");
  headers.set(
    "Link",
    existing ? `${existing}, ${links.join(", ")}` : links.join(", "),
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
