import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { AutoScrollToTop } from './AutoScrollToTop';

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sideBar } = useSelector((state: AppState) => state.ui);
  return (
    <main className={`main${!sideBar ? ' center' : ''}`}>
      <AutoScrollToTop />
      <>{children}</>
    </main>
  );
};
