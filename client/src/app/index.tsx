import * as React from 'react';
import { Helmet } from 'react-helmet-async';
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

      <Switch>
        <Route exact path={PATH.HOME} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
