import { lazyLoad } from 'src/utils/loadable';

export const AccountPage = lazyLoad(
  () => import('./index'),
  module => module.AccountPage,
);
