import React from 'react';
import { LoadingIndicator } from 'src/app/components/skeleton/LoadingIndicator';
import { lazyLoad } from 'src/utils/loadable';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  module => module.NotFoundPage,
  {
    fallback: <LoadingIndicator />,
  },
);
