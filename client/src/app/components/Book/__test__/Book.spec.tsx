import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { Book, BookProps } from '../Book';
import { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

const renderComponent = (props: BookProps) =>
  renderer.create(
    <MemoryRouter>
      <Provider store={store}>
        <Book {...props} />
      </Provider>
    </MemoryRouter>,
  );

const mockBookProps: BookProps = {
  _id: 'some',
  title: 'some',
  price: 0,
  old_price: 0,
};
describe('<Book>', () => {
  it('Should match snapshot', () => {
    const bookComponent = renderComponent(mockBookProps);
    expect(bookComponent.toJSON()).toMatchSnapshot();
  });
});
