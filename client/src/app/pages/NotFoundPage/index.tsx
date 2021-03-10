import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';

export const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="not-found">
        <h1>Sorry</h1>
        <p>That page can't be found</p>
        <Link to="/" className="not-found__link">
          Back to homepage
        </Link>
      </div>
    </MainLayout>
  );
};
