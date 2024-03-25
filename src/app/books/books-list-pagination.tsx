import { Button } from "~/components/ui/button";
import { MAX_BOOKS_PER_PAGE } from "./constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  count: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function BooksListPagination({
  count,
  currentPage,
  onPageChange,
}: Props) {
  const pages = Math.ceil(count / MAX_BOOKS_PER_PAGE);
  const canGoNext = currentPage < pages;
  const canGoPrev = currentPage > 1;
  const handleNextPageClick = () => onPageChange(currentPage + 1);

  const handlePrevPageClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  return (
    <div className="flex justify-center space-x-2">
      <Button disabled={!canGoPrev} onClick={handlePrevPageClick}>
        <ArrowLeft /> Prev
      </Button>
      {Array.from({ length: pages }, (_, i) => {
        const page = i + 1;
        return (
          <Button
            variant={currentPage === page ? "default" : "outline"}
            disabled={currentPage === page}
            onClick={() => onPageChange(page)}
            key={i}
          >
            {page}
          </Button>
        );
      })}
      <Button disabled={!canGoNext} onClick={handleNextPageClick}>
        Next <ArrowRight />
      </Button>
    </div>
  );
}
