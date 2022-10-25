import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

export interface PaginationProps {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}
export default function Pagination({
  page,
  totalPages,
  handlePagination,
}: PaginationProps) {
  const renderActivePageNo = (page: boolean) => {
    return page
      ? 'text-green-300 hover:border-green-300 border-green-300 hover:text-green-100'
      : 'text-gray-500 hover:border-gray-300 border-gray-200 hover:text-gray-700';
  };

  return (
    <nav className="flex items-center justify-between border-t  px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {page !== 1 && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page - 1)}
          >
            <BsArrowLeft className="mr-3" />
            Previous
          </button>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        <button
          type="button"
          className={`${renderActivePageNo(
            page === 1,
          )} inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium`}
          onClick={() => handlePagination(1)}
        >
          1
        </button>
        {page > 3 && (
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
        )}
        {page === totalPages && totalPages > 3 && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page - 2)}
          >
            {page - 2}
          </button>
        )}
        {page > 2 && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page - 1)}
          >
            {page - 1}
          </button>
        )}
        {page !== 1 && page !== totalPages && (
          <button
            type="button"
            className={`${renderActivePageNo(
              page !== 1 && page !== totalPages,
            )} inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium`}
            onClick={() => handlePagination(page)}
          >
            {page}
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page + 1)}
          >
            {page + 1}
          </button>
        )}
        {page === 1 && totalPages > 3 && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page + 2)}
          >
            {page + 2}
          </button>
        )}
        {page < totalPages - 2 && (
          <span
            className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}
          >
            ...
          </span>
        )}
        {page !== 1 && (
          <button
            type="button"
            className={`${renderActivePageNo(
              page === totalPages,
            )} inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}
            onClick={() => handlePagination(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {page !== totalPages && (
          <button
            type="button"
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            onClick={() => handlePagination(page + 1)}
          >
            Next
            <BsArrowRight className={'ml-3'} />
          </button>
        )}
      </div>
    </nav>
  );
}
