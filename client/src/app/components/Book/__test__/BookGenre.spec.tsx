import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import { store } from 'src/store';
import { BooksGenre } from '../BooksGenre';

const renderer = createRenderer();
const renderComponent = () =>
  renderer.render(
    <Provider store={store}>
      <BooksGenre />
    </Provider>,
  );

jest.mock('react-router', () => ({
  useParams: () => ({
    genre: 'some',
  }),
  useRouteMatch: () => ({ url: '/books/genre/some' }),
  useLocation: () => ({
    pathname: '/books/with-some-title',
  }),
}));

describe('<BookGenre/>', () => {
  it('Should match snapshot', () => {
    renderComponent();
    const renderOutput = renderer.getRenderOutput();
    expect(renderOutput).toMatchSnapshot();
  });
});
