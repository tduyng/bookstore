import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IBook } from 'src/app/features/book/book.types';
import LazyLoad from 'react-lazyload';
import SkeletonBook from '../Skeletons/SkeletonBook';
import { Book } from './Book';
import { Pagination } from './Pagination';

interface BooksListProps {
  status: string;
  books: IBook[];
  page: number;
  count: number;
  message: string;
  limit: number;
  q?: string;
}
export const BooksList: React.FC<BooksListProps> = props => {
  const { status, books, page, count, message, limit, q } = props;
  const [activeLimit, setActiveLimit] = useState(false);
  const [path, setPath] = useState('');
  const location = useLocation();
  const handleClickLimit = () => {
    setActiveLimit(!activeLimit);
  };
  const ref: any = useRef();
  const handleClickOutsideLimit = (e: any) => {
    if (ref.current?.classList?.contains('active') && !ref.current?.contains(e.target)) {
      setActiveLimit(!activeLimit);
    }
  };

  useEffect(() => {
    setPath(location.pathname);
    document.addEventListener('click', handleClickOutsideLimit);
    return () => {
      document.removeEventListener('click', handleClickOutsideLimit);
    };
  }, [path, setPath]);

  return (
    <>
      {status === 'success' && (
        <div className="books__sort">
          <div
            className={`books__sort--limit${activeLimit ? ' active' : ''}`}
            onClick={handleClickLimit}
            ref={ref}
          >
            <p className="books__sort--limit__current">{`${limit} products`}</p>
            <ul className="books__sort--limit__option" onMouseLeave={handleClickLimit}>
              <Link
                to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=1&limit=15`}
                className="books__sort--limit__option--link"
              >
                <li>15 products</li>
              </Link>
              <Link
                to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=1&limit=25`}
                className="books__sort--limit__option--link"
              >
                <li>25 products</li>
              </Link>
              <Link
                to={`${path}?${q ? 'q=' : ''}${q ? q : ''}${q ? '&' : ''}p=1&limit=50`}
                className="books__sort--limit__option--link"
              >
                <li>50 products</li>
              </Link>
            </ul>

            <div className="books__sort--limit__icon">
              <i className="fas fa-angle-down"></i>
            </div>
          </div>
        </div>
      )}
      {status === 'success' &&
        books.map(book => (
          <LazyLoad key={book._id} placeholder={<SkeletonBook />}>
            <Suspense fallback={<SkeletonBook />}>
              <Book
                imgURL={book.imgURL}
                title={book.title}
                price={book.price}
                old_price={book.old_price}
                key={book._id}
                _id={book._id}
              />
            </Suspense>
          </LazyLoad>
        ))}
      {status === 'failed' && <h1 className="error">{message}</h1>}
      {count > limit && <Pagination count={count} limit={limit} page={page} q={q} />}
    </>
  );
};
