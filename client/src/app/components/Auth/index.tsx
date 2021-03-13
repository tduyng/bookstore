import React, { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { clearStatus } from 'src/app/features/user/user.slice';
import { useAppDispatch } from 'src/store';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthProps {
  open: boolean;
  onClose: () => void;
}
export const Auth: React.FC<AuthProps> = ({ open, onClose }) => {
  const [method, setMethod] = useState('login');
  const dispatch = useAppDispatch();
  const onLoginTab = () => {
    setMethod('login');
    dispatch(clearStatus());
  };
  const onSignupTab = () => {
    setMethod('signup');
    dispatch(clearStatus());
  };

  return (
    <Modal open={open} onClose={onClose} center classNames={{ modal: 'auth' }}>
      <div className="auth-wrapper">
        <div
          className={`auth__links${method === 'login' ? ' active' : ''}`}
          onClick={onLoginTab}
        >
          <p className="auth__links--login">Login</p>
        </div>
        <div
          className={`auth__links${method === 'signup' ? ' active' : ''}`}
          onClick={onSignupTab}
        >
          <p className="auth__links--signup">Signup</p>
        </div>
        {method === 'login' ? <LoginForm /> : <RegisterForm />}
        <a href="#" className="oauth auth__facebook">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="oauth auth__google">
          <i className="fab fa-google"></i>
        </a>
      </div>
    </Modal>
  );
};
