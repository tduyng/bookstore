import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { register } from 'src/app/features/user/user.actions';
import { useAppDispatch } from 'src/store';
import { AppState } from 'src/store/reducers';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const { errorMsg, successMsg } = useSelector((state: AppState) => state.user);
  const [buttonText, setButtonText] = useState('Signup');
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (name: string) => (e: any) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setButtonText('Signing up...');
    dispatch(register(formData)).then(unwrapResult => {
      if (unwrapResult.meta.requestStatus === 'fulfilled') {
        toast.success(
          'We just send a link to your mail. Check it to activate you account.',
          { duration: 5000 },
        );
        history.goBack();
      }
      setButtonText('Signup');
    });
  };

  return (
    <div className="auth__form">
      <form onSubmit={handleSubmit}>
        <div className="auth__form--input">
          <label htmlFor="signup__username">Username</label>
          <input
            type="text"
            className="auth__form--input__username"
            id="signup__username"
            placeholder="Username"
            onChange={handleChange('username')}
            required
          />
        </div>
        <div className="auth__form--input">
          <label htmlFor="signup__email">Email</label>
          <input
            type="email"
            className="auth__form--input__email"
            id="signup__email"
            placeholder="Email"
            onChange={handleChange('email')}
            required
          />
        </div>
        <div className="auth__form--input">
          <label htmlFor="signup__password">Password</label>
          <input
            type="password"
            className="auth__form--input__password"
            id="signup__password"
            placeholder="Password"
            autoComplete="password"
            onChange={handleChange('password')}
            required
          />
        </div>
        {errorMsg && errorMsg != 'Unauthorized' ? (
          <p className="auth__form--error">{errorMsg}</p>
        ) : null}
        {successMsg ? <p className="auth__form--success">{successMsg}</p> : null}
        <button type="submit" className="auth__form--button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};
