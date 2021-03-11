import React from 'react';
import { useHistory } from 'react-router-dom';
import { MainLayout } from 'src/app/components/Layouts/MainLayout';

export const NotFoundPage = () => {
  const history = useHistory();
  return (
    <MainLayout>
      <div className="not-found">
        <h1>Sorry</h1>
        <p>That page can't be found</p>
        <div className="not-found__link" onClick={() => history.goBack()}>
          Go back
        </div>
      </div>
    </MainLayout>
  );
};
