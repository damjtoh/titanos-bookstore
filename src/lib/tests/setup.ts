/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { beforeAll, vi } from "vitest";
import NextRouterMock, { useRouter } from "next-router-mock";

beforeAll(() => {
  vi.mock("next/router", () => NextRouterMock);
  vi.mock("next/navigation", () => {
    const usePathname = () => {
      const router = useRouter();
      return router.pathname;
    };

    const useSearchParams = () => {
      const router = useRouter();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return new URLSearchParams(router.query);
    };

    return {
      useRouter,
      usePathname,
      useSearchParams,
    };
  });
  vi.mock("~/server/book-service", async () => {
    const actual = await vi.importActual("~/lib/__mocks__/book-service");
    return {
      ...actual,
    };
  });
});
