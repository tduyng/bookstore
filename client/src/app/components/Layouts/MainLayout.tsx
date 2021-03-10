import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { NavBar } from '../NavBar';
import { AutoScrollToTop } from './AutoScrollToTop';
import { Footer } from './Footer';
import ScrollToTop from './ScrollToTop';

const mapStateToProps = (state: AppState) => ({
  sideBar: state.ui.sideBar,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface MainLayoutProps extends ConnectedProps<typeof connector> {}

export const MainLayout: React.FC<MainLayoutProps> = ({ sideBar, children }) => {
  return (
    <div className="App">
      <NavBar />
      <main className={`main${!sideBar ? ' center' : ''}`}>
        <AutoScrollToTop />
        <>{children}</>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};
