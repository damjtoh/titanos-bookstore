import PageTitle from "~/components/ui/page-title";
import AddBookForm from "../book-form";
import { ROUTES } from "~/lib/constants";

export default function AddBookPage() {
  return (
    <>
      <PageTitle backUrl={ROUTES.BOOKS_LIST}>Add new book</PageTitle>
      <AddBookForm />
    </>
  );
}
