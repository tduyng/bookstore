import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { NavBar } from './NavBar';
import { AutoScrollToTop } from './AutoScrollToTop';
import { Footer } from './Footer';
import ScrollToTop from './ScrollToTop';

const mapStateToProps = (state: AppState) => ({
  sideBar: state.ui.sideBar,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface ConnectProps extends ConnectedProps<typeof connector> {}
type MainLayoutProps = ConnectProps & { hideFooter?: boolean };

export const MainLayout: React.FC<MainLayoutProps> = ({
  sideBar,
  children,
  hideFooter,
}) => {
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
