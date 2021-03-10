import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { PATH } from 'src/app/constants/paths.constant';
import { login } from 'src/app/features/user/user.actions';
import { useAppDispatch } from 'src/store';
import { AppState } from 'src/store/reducers';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [btnText, setBtnText] = useState('Login');
  const [userData, setUserData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const history = useHistory();

  const handleChange = (name: string) => (e: any) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setBtnText('Logging...');
    dispatch(login(userData)).then(unwrapResult => {
      if (unwrapResult.meta.requestStatus === 'fulfilled') {
        history.goBack();
      }
    });
  };

  const { errorMsg } = useSelector((state: AppState) => state.user);
  return (
    <div className="auth__form">
      <form onSubmit={handleSubmit}>
        <div className="auth__form--input">
          <label htmlFor="login__email">Email</label>
          <input
            type="text"
            className="auth__form--input__email"
            id="login__email"
            placeholder="Username or Email"
            onChange={handleChange('usernameOrEmail')}
            required
          />
        </div>
        <div className="auth__form--input">
          <label htmlFor="login__password">Password</label>
          <input
            type="password"
            className="auth__form--input__password"
            id="login__password"
            placeholder="Password"
            onChange={handleChange('password')}
            autoComplete="password"
            required
          />
        </div>
        {errorMsg && errorMsg != 'Unauthorized' ? (
          <p className="auth__form--error">{errorMsg}</p>
        ) : null}
        <button type="submit" className="auth__form--button">
          {btnText}
        </button>
      </form>

      <p className="auth__form--reset">
        <a href={PATH.FORGOT_PASSWORD}>Forgot password?</a>
      </p>
    </div>
  );
};
