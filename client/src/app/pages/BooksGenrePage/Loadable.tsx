import React from 'react';
import { LoadingIndicator } from 'src/app/components/Skeletons/LoadingIndicator';
import { lazyLoad } from 'src/utils/loadable';

export const BooksGenrePage = lazyLoad(
  () => import('./index'),
  module => module.BooksGenrePage,
  {
    fallback: <LoadingIndicator />,
  },
);
