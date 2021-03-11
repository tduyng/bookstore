import { lazyLoad } from 'src/utils/loadable';

export const BooksSearchPage = lazyLoad(
  () => import('./index'),
  module => module.BooksSearchPage,
);
