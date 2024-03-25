import { createSafeActionClient } from "next-safe-action";
import { ServerError } from "./server-errors";

export const action = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ServerError) return e.message;
    return "UNKNOWN_ERROR";
  },
});
