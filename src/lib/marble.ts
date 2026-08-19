import {
  getErrorMessage,
  isJsonArray,
  isJsonObject,
  isString,
  readJsonValue,
  type JsonObject,
  type JsonValue,
} from "./json";

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

export type AuthorInfo = {
  name: string;
  image: string;
};

const baseUrl = "https://api.marblecms.com";

async function apiGet(path: string): Promise<Response | null> {
  const key = import.meta.env.MARBLE_API_KEY;
  if (!key) {
    return null;
  }

  return fetch(`${baseUrl}${path}`, {
    headers: {
      Authorization: key,
      Accept: "application/json",
    },
  });
}

function parseAuthor(value: JsonObject): Author | null {
  if (!isString(value.name) || !isString(value.image)) {
    return null;
  }

  return {
    name: value.name,
    image: value.image,
  };
}

function parseTag(value: JsonObject): Tag | null {
  if (!isString(value.name) || !isString(value.slug)) {
    return null;
  }

  return {
    name: value.name,
    slug: value.slug,
  };
}

function parseAuthors(value: JsonValue): Author[] {
  if (!isJsonArray(value)) {
    return [];
  }

  return value
    .map((entry) => (isJsonObject(entry) ? parseAuthor(entry) : null))
    .filter((author): author is Author => author !== null);
}

function parseTags(value: JsonValue): Tag[] {
  if (!isJsonArray(value)) {
    return [];
  }

  return value
    .map((entry) => (isJsonObject(entry) ? parseTag(entry) : null))
    .filter((tag): tag is Tag => tag !== null);
}

function parsePost(value: JsonObject): Post | null {
  if (
    !isString(value.id) ||
    !isString(value.slug) ||
    !isString(value.title) ||
    !isString(value.description) ||
    !isString(value.content) ||
    !isString(value.coverImage) ||
    !isString(value.publishedAt) ||
    !isString(value.updatedAt)
  ) {
    return null;
  }

  return {
    id: value.id,
    slug: value.slug,
    title: value.title,
    description: value.description,
    content: value.content,
    coverImage: value.coverImage,
    publishedAt: value.publishedAt,
    updatedAt: value.updatedAt,
    authors: parseAuthors(value.authors),
    tags: parseTags(value.tags),
  };
}

function parsePostsResponse(value: JsonValue | null): Post[] {
  if (!isJsonObject(value) || !isJsonArray(value.posts)) {
    return [];
  }

  return value.posts
    .map((entry) => (isJsonObject(entry) ? parsePost(entry) : null))
    .filter((post): post is Post => post !== null);
}

function parsePostResponse(value: JsonValue | null): Post | null {
  if (!isJsonObject(value) || value.post === null) {
    return null;
  }

  if (!isJsonObject(value.post)) {
    return null;
  }

  return parsePost(value.post);
}

export async function listPosts(): Promise<Post[]> {
  try {
    const response = await apiGet("/v1/posts");
    if (!response) {
      return [];
    }
    if (!response.ok) {
      console.error("marble ListPosts:", response.status, await response.text());
      return [];
    }

    const parsed = await readJsonValue(response);
    return parsePostsResponse(parsed);
  } catch (caught) {
    console.error(
      "marble ListPosts:",
      getErrorMessage(caught instanceof Error ? caught : String(caught)),
    );
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await apiGet(`/v1/posts/${slug}`);
    if (!response) {
      return null;
    }
    if (!response.ok) {
      console.error(
        "marble GetPost:",
        slug,
        response.status,
        await response.text(),
      );
      return null;
    }

    const parsed = await readJsonValue(response);
    return parsePostResponse(parsed);
  } catch (caught) {
    console.error(
      "marble GetPost:",
      slug,
      getErrorMessage(caught instanceof Error ? caught : String(caught)),
    );
    return null;
  }
}

export async function verifySignature(
  secret: string,
  signatureHeader: string,
  bodyText: string,
): Promise<boolean> {
  const expected = signatureHeader.replace(/^sha256=/, "");
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(bodyText);

  try {
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", key, messageData);
    const hash = Array.from(new Uint8Array(signature))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hash === expected;
  } catch {
    return false;
  }
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

export function getAuthor(post: Post): AuthorInfo {
  const author = post.authors[0];
  return {
    name: author?.name || "Valtteri Savonen",
    image: author?.image || "",
  };
}
