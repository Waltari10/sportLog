import { QueryClient } from "@tanstack/react-query";

export const queryKeys = {
  getNotes: ["getNotes"],
} as const;

export const queryClient = new QueryClient();
