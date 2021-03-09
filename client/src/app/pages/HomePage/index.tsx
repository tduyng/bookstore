import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from 'src/app/components/MainLayout';

export const HomePage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page Bookstore application" />
      </Helmet>
      <div className="not-found">
        <h1>Home page</h1>
      </div>
    </MainLayout>
  );
};
