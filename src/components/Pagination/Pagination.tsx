import React from 'react';
import styles from './Pagination.module.scss';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.limitDisplay}>
        Showing
        <select
          value={itemsPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
        out of {totalItems}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${styles.navBtn} ${
            currentPage === 1 ? styles.disabled : styles.activeChevron
          }`}
        >
          <FiChevronLeft />
        </button>

        {pageNumbers().map((num, index) =>
          typeof num === 'number' ? (
            <button key={index} onClick={() => onPageChange(num)}>
              <span className={num === currentPage ? styles.activeText : ''}>
                {num}
              </span>
            </button>
          ) : (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${styles.navBtn} ${
            currentPage === totalPages ? styles.disabled : styles.activeChevron
          }`}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
