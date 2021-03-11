import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { Account } from 'src/app/components/User/Account';

export const AccountPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Account</title>
        <meta name="description" content="Account page Bookstore application" />
      </Helmet>
      <Account />
    </MainLayout>
  );
};
