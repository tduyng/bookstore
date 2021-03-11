import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookSearch } from 'src/app/components/Book/BooksSearch';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';

export const BooksSearchPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Books Search</title>
        <meta name="description" content="Books search page Bookstore application" />
      </Helmet>
      <BookSearch />
    </MainLayout>
  );
};
