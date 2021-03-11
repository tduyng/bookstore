import { lazyLoad } from 'src/utils/loadable';

export const PaymentPage = lazyLoad(
  () => import('./index'),
  module => module.PaymentPage,
);
