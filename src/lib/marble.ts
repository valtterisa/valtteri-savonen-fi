export type Author = {
  name: string;
  image: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  authors: Author[];
  tags: Tag[];
};

const baseUrl = "https://api.marblecms.com";

async function apiGet(path: string): Promise<Response> {
  const key = import.meta.env.MARBLE_API_KEY;
  if (!key) {
    throw new Error("MARBLE_API_KEY not set");
  }

  return fetch(`${baseUrl}${path}`, {
    headers: {
      Authorization: key,
      Accept: "application/json",
    },
  });
}

export async function listPosts(): Promise<Post[]> {
  try {
    const response = await apiGet("/v1/posts");
    if (!response.ok) {
      console.error("marble ListPosts:", response.status, await response.text());
      return [];
    }

    const parsed = (await response.json()) as { posts: Post[] };
    return parsed.posts ?? [];
  } catch (error) {
    console.error("marble ListPosts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await apiGet(`/v1/posts/${slug}`);
    if (!response.ok) {
      console.error(
        "marble GetPost:",
        slug,
        response.status,
        await response.text(),
      );
      return null;
    }

    const parsed = (await response.json()) as { post: Post | null };
    return parsed.post ?? null;
  } catch (error) {
    console.error("marble GetPost:", slug, error);
    return null;
  }
}

export function verifySignature(
  secret: string,
  signatureHeader: string,
  bodyText: string,
): boolean {
  const expected = signatureHeader.replace(/^sha256=/, "");
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(bodyText);

  return crypto.subtle
    .importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, [
      "sign",
    ])
    .then((key) => crypto.subtle.sign("HMAC", key, messageData))
    .then((signature) => {
      const hash = Array.from(new Uint8Array(signature))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return hash === expected;
    })
    .catch(() => false);
}

export function formatPublished(raw: string): string {
  if (!raw) {
    return "";
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return raw;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getAuthor(post: Post): { name: string; image: string } {
  const author = post.authors[0];
  return {
    name: author?.name || "Valtteri Savonen",
    image: author?.image || "",
  };
}
