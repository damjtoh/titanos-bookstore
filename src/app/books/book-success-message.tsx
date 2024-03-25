"use client";

import { CircleCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import { SUCCESS_MESSAGES } from "./constants";

export default function BookSuccessMessage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  if (!success) return null;
  const message = SUCCESS_MESSAGES[success];
  if (!message) return null;
  return (
    <Alert variant="success">
      <CircleCheck className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
