import { z } from "zod";
import type { Book } from "@prisma/client";

export type ListBooksResult = {
  total: number;
  results: Book[];
};

export const SortSchema = z.union([
  z.literal("title-asc"),
  z.literal("title-desc"),
  z.literal("author-asc"),
  z.literal("author-desc"),
  z.literal("price-asc"),
  z.literal("price-desc"),
]);

export type Sort = z.infer<typeof SortSchema>;

const FiltersSchema = z.object({
  page: z.number().int().positive(),
  search: z.string(),
  sort: SortSchema.default("title-asc"),
});

export type Filters = z.infer<typeof FiltersSchema>;
