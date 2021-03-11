import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { Checkout } from 'src/app/components/User/CheckOut';

export const CheckoutPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout page Bookstore application" />
      </Helmet>
      <Checkout />
    </MainLayout>
  );
};
