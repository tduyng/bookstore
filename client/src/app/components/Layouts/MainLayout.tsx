import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { NavBar } from './NavBar';
import { AutoScrollToTop } from './AutoScrollToTop';
import { Footer } from './Footer';
import ScrollToTop from './ScrollToTop';

interface MainLayoutProps {
  hideFooter?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ hideFooter, children }) => {
  const { sideBar } = useSelector((state: AppState) => state.ui);
  return (
    <div className="App">
      <NavBar />
      <main className={`main${!sideBar ? ' center' : ''}`}>
        <AutoScrollToTop />
        <>{children}</>
      </main>
      {hideFooter ? null : <Footer />}
      <ScrollToTop />
    </div>
  );
};

MainLayout.defaultProps = {
  hideFooter: false,
};
