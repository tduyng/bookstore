import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Landing } from 'src/app/components/Landing';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';

export const HomePage = () => {
  return (
    <MainLayout sideBar={false}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page Bookstore application" />
      </Helmet>
      <Landing sideBar={false} />
    </MainLayout>
  );
};
