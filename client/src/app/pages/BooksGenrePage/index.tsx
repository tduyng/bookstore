import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BooksGenre } from 'src/app/components/Book/BooksGenre';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { AppState } from 'src/store/reducers';

export const BooksGenrePage = () => {
  const { book } = useSelector((state: AppState) => state.book);
  return (
    <MainLayout>
      <Helmet>
        <title>{book?.genre}</title>
        <meta name="description" content={book?.genre} />
      </Helmet>
      <BooksGenre />
    </MainLayout>
  );
};
