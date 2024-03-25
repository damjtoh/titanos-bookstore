import { type Book, type Prisma } from "@prisma/client";
import { DEFAULT_SORT } from "./constants";
import { type Filters, type Sort, SortSchema } from "./schemas";

export function decodeURLSearchParamsToState(params: URLSearchParams) {
  const rawSort = SortSchema.safeParse(params.get("sort"));
  const sort = rawSort.success ? rawSort.data : DEFAULT_SORT;
  const page = parseInt(params.get("page") ?? "1", 10);
  const search = params.get("search") ?? "";
  return { sort, page, search };
}

export function encodeStateToURLSearchParams(filters: Partial<Filters>) {
  const params = new URLSearchParams();
  if (filters.sort) {
    params.set("sort", filters.sort);
  }
  if (filters.page && filters.page > 1)
    params.set("page", filters.page.toString());
  if (filters.search) params.set("search", filters.search);
  return params;
}

export function transformSortToDatabase(
  sort: Sort,
): Prisma.BookOrderByWithRelationInput {
  const [field, order] = sort.split("-") as [keyof Book, "asc" | "desc"];
  return { [field]: order };
}
