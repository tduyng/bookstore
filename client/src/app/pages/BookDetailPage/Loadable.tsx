import { lazyLoad } from 'src/utils/loadable';

export const BookDetailPage = lazyLoad(
  () => import('./index'),
  module => module.BookDetailPage,
);
