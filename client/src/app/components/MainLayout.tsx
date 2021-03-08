import React from 'react';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <h1>Navbar</h1>
      <div>{children}</div>
    </>
  );
};
