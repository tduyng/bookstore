import React from 'react';
import { Navbar } from './Navbar';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};
