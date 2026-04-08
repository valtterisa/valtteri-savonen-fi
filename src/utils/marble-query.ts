import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { marble } from "../lib/marble";

type MarblePostResult = Awaited<ReturnType<typeof marble.posts.list>>["result"];
type MarbleSinglePostResult = Awaited<ReturnType<typeof marble.posts.get>>;
const emptyPostsResult: MarblePostResult = {
  posts: [],
  pagination: {
    limit: 0,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    totalPages: 0,
    totalItems: 0,
  },
};

const isRecoverableBlogApiError = (error: unknown) => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as { status?: number; message?: string };
  const status = candidate.status;
  const message = (candidate.message || "").toLowerCase();

  return status === 401 || status === 429 || message.includes("unauthorized") || message.includes("api key required") || message.includes("rate limit");
};

export const getPosts = createServerFn().handler(async () => {
  try {
    const posts = await marble.posts.list();
    return posts.result;
  } catch {
    return emptyPostsResult;
  }
});

export const getTags = createServerFn().handler(async () => {
  const tags = await marble.tags.list();
  return tags.result;
});

export const getSinglePost = createServerFn()
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    try {
      const post = await marble.posts.get({ identifier: slug });
      return post;
    } catch (error) {
      if (isRecoverableBlogApiError(error)) {
        return null as MarbleSinglePostResult | null;
      }

      return null as MarbleSinglePostResult | null;
    }
  });

export const getCategories = createServerFn().handler(async () => {
  const categories = await marble.categories.list();
  return categories.result;
});

export const getAuthors = createServerFn().handler(async () => {
  const authors = await marble.authors.list();
  return authors.result;
});