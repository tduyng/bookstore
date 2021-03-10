import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Landing } from 'src/app/components/Landing';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { AppState } from 'src/store/reducers';

export const HomePage = () => {
  const { sideBar } = useSelector((state: AppState) => state.ui);
  return (
    <MainLayout sideBar={sideBar}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page Bookstore application" />
      </Helmet>
      <Landing />
    </MainLayout>
  );
};
