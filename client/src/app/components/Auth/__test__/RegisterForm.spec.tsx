import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RegisterForm } from '../RegisterForm';
import { store } from 'src/store';

describe('<RegisterFrom/>', () => {
  it('Should match snapshot', () => {
    const Register = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>,
    );
    expect(Register.container.firstChild).toMatchSnapshot();
  });
});
