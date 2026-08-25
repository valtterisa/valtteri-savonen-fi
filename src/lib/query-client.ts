import { QueryClient } from "@tanstack/react-query";

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: EIGHT_HOURS_MS,
        gcTime: EIGHT_HOURS_MS,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}
