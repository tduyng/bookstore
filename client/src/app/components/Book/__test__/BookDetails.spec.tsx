import React from 'react';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-test-renderer/shallow';
import { store } from 'src/store';
import { BookDetail } from '../BookDetails';
import 'src/__mocks__/matchMedia.mock';

const renderer = createRenderer();

const renderComponent = () =>
  renderer.render(
    <Provider store={store}>
      <BookDetail />
    </Provider>,
  );

describe('<BookDetails/>', () => {
  it('Should match snapshot', () => {
    renderComponent();
    const renderOutput = renderer.getRenderOutput();
    expect(renderOutput).toMatchSnapshot();
  });
});
