import Link from "next/link";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import PageTitle from "~/components/ui/page-title";
import { ROUTES } from "~/lib/constants";

export default function HomePage() {
  return (
    <section>
      <PageTitle>Home</PageTitle>
      <div className="mt-4 grid grid-cols-6">
        <ul>
          <li>
            <Link href={ROUTES.BOOKS_LIST}>
              <Card className="flex aspect-square items-center justify-center hover:bg-gray-50">
                <CardHeader>
                  <CardTitle>Book Inventory</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
