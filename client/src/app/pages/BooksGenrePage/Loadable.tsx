import { lazyLoad } from 'src/utils/loadable';

export const BooksGenrePage = lazyLoad(
  () => import('./index'),
  module => module.BooksGenrePage,
);
