import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { Auth } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

const renderer = createRenderer();

describe('<Auth/>', () => {
  it('Should match snapshot', () => {
    renderer.render(
      <Provider store={store}>
        <Auth open={true} onClose={() => jest.fn()} />
      </Provider>,
    );
    const renderOutput = renderer.getRenderOutput();

    expect(renderOutput).toMatchSnapshot();
  });
});
