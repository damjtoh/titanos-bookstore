import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  backUrl?: string;
};

export default function PageTitle({ children, backUrl }: Props) {
  return (
    <div className="flex items-center space-x-3">
      {backUrl && (
        <Link href={backUrl}>
          <ArrowLeft />
        </Link>
      )}
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  );
}
