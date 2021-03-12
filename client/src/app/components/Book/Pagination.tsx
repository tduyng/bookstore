import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
  count: number;
  limit: number;
  page: number;
  q?: string;
}

export const Pagination: React.FC<PaginationProps> = ({ count, limit, page, q }) => {
  const [currentPage, setCurrentPage] = useState(page);
  const pages = Math.ceil(count / limit);
  const location = useLocation();
  const path = location.pathname;

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  const changePage = (e: any) => {
    window.scroll({ top: 0, behavior: 'smooth' });
    setCurrentPage(parseInt(e.target.textContent));
  };

  const nextPage = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
    setCurrentPage(currentPage + 3);
  };

  const prevPage = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
    setCurrentPage(currentPage - 3);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [path, page]);

  return (
    <div className="pagination">
      <Link
        className={`pagination__page${currentPage === 1 ? ' active' : ''}`}
        onClick={changePage}
        key={1}
        to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=1&limit=${limit}`}
      >
        1
      </Link>
      {/* Icon prev */}
      {currentPage > 4 && pages > 5 && (
        <Link
          className="pagination__prev-page"
          onClick={prevPage}
          to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=${
            currentPage - 3
          }&limit=${limit}`}
        >
          <i className="fas fa-angle-double-left"></i>
        </Link>
      )}
      {range(
        currentPage >= 4 ? currentPage - 2 : 2,
        currentPage + 2 >= pages - 1 ? pages - 1 : currentPage + 2,
        1,
      ).map(n => (
        <Link
          className={`pagination__page${currentPage === n ? ' active' : ''}`}
          onClick={changePage}
          key={n}
          to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=${n}&limit=${limit}`}
        >
          {n}
        </Link>
      ))}

      {/* Icon next */}
      {currentPage <= pages - 4 && pages > 5 && (
        <Link
          className="pagination__next-page"
          onClick={nextPage}
          to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=${
            currentPage + 3
          }&limit=${limit}`}
        >
          <i className="fas fa-angle-double-right"></i>
        </Link>
      )}
      <Link
        className={`pagination__page${currentPage === pages ? ' active' : ''}`}
        onClick={changePage}
        key={pages}
        to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${
          q ? '&' : ''
        }p=${pages}&limit=${limit}`}
      >
        {pages}
      </Link>
    </div>
  );
};
