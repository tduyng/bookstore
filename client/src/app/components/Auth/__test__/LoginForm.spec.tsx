import React from 'react';
import { render } from '@testing-library/react';
import { LoginForm } from '../LoginForm';
import { Provider } from 'react-redux';
import { store } from 'src/store';

describe('<LoginForm/>', () => {
  it('Should match the snapshot', () => {
    const Login = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );
    expect(Login.container.firstChild).toMatchSnapshot();
  });
});
