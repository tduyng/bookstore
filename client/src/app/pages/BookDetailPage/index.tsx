import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { BookDetail } from 'src/app/components/Book/BookDetails';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { AppState } from 'src/store/reducers';

export const BookDetailPage = () => {
  const { book } = useSelector((state: AppState) => state.book);
  return (
    <MainLayout>
      <Helmet>
        <title>{book?.title}</title>
        <meta name="description" content={book?.title} />
      </Helmet>
      <BookDetail />
    </MainLayout>
  );
};
