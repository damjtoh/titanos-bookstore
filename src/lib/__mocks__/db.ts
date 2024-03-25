/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(db);
});

const db = mockDeep<PrismaClient>();
export { db };
