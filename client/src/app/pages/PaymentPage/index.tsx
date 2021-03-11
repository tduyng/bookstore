import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';
import { Payment } from 'src/app/components/User/Payment';

export const PaymentPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout page Bookstore application" />
      </Helmet>
      <Payment />
    </MainLayout>
  );
};
