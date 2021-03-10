import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { PATH } from './constants/paths.constant';
import { HomePage } from './pages/HomePage/Loadable';

import { NotFoundPage } from './pages/NotFoundPage/Loadable';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Bookstore" defaultTitle="Bookstore">
        <meta name="description" content="Bookstore application" />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: '1.6rem' },
        }}
      />

      <Switch>
        {/* <Route path="/books/genre/:genre" component={BooksGenre} />
        <Route path="/books/search" component={BooksSearch} />
        <Route path="/account" component={Account} />
        <Route path="/book/:id" component={BookDetail} />
        <Route path="/checkout/payment" component={Payment} />
        <Route path="/checkout" component={Checkout} exact /> */}
        <Route exact path={PATH.HOME} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
