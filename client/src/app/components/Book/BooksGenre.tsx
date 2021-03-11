import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchBooks } from 'src/app/features/book/book.actions';
import { useQueryUrl } from 'src/app/hooks/useQueryUrl';
import { useAppDispatch } from 'src/store';
import { AppState } from 'src/store/reducers';
import SkeletonBook from '../skeleton/SkeletonBook';
import { BooksList } from './BooksList';

export const BooksGenre = () => {
  const dispatch = useAppDispatch();
  const { books, status, count, message } = useSelector((state: AppState) => state.book);
  const { genre } = useParams<{ genre: string }>();
  const limit: number = parseInt(useQueryUrl('limit')) || 25;
  const page: number = parseInt(useQueryUrl('p')) || 1;

  useEffect(() => {
    const getBooks = async () => {
      await dispatch(fetchBooks({ genre, limit, page }));
    };
    getBooks();
  }, [genre, limit, page, dispatch]);

  return (
    <div className="books">
      {status === 'idle' || status === 'loading' ? (
        Array.from(Array(10).keys()).map(n => <SkeletonBook key={n} />)
      ) : (
        <>
          {status === 'success' && <div className="books__desc">{books[0].genre}</div>}
          <BooksList
            status={status}
            books={books}
            message={message}
            count={count}
            page={page}
            limit={limit}
          />
        </>
      )}
    </div>
  );
};
