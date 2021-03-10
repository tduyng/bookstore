import React from 'react';
import { NavBar } from '../NavBar';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="App">
      <NavBar />
      <div>{children}</div>
    </div>
  );
};
