import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { queryBooks } from 'src/app/features/book/book.actions';
import { useQueryUrl } from 'src/app/hooks/useQueryUrl';
import { useAppDispatch } from 'src/store';
import { AppState } from 'src/store/reducers';
import SkeletonBook from '../Skeletons/SkeletonBook';
import { BooksList } from './BooksList';

export const BookSearch = () => {
  const dispatch = useAppDispatch();
  const { status, count, books, message } = useSelector((state: AppState) => state.book);

  const limit = parseInt(useQueryUrl('limit')) || 25;
  const page = parseInt(useQueryUrl('p')) || 1;
  const q = useQueryUrl('q') || '';

  useEffect(() => {
    if (!q) return;
    const getQueriedBooks = async () => {
      return await dispatch(queryBooks({ q, limit, page }));
    };
    getQueriedBooks();
  }, [limit, page, dispatch, q]);
  return (
    <div className="books">
      {status === 'idle' || status === 'loading' ? (
        Array.from(Array(10).keys()).map(n => <SkeletonBook key={n} />)
      ) : (
        <>
          {status === 'success' && <div className="books__desc">Result for : {q}</div>}
          {books && books.length > 0 ? (
            <BooksList
              status={status}
              books={books}
              message={message}
              count={count}
              page={page}
              limit={limit}
              q={q}
            />
          ) : (
            <h2>No result found</h2>
          )}
        </>
      )}
    </div>
  );
};
