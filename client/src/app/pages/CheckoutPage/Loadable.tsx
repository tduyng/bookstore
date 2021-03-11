import { lazyLoad } from 'src/utils/loadable';

export const CheckoutPage = lazyLoad(
  () => import('./index'),
  module => module.CheckoutPage,
);
