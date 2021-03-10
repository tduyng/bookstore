import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface AutoScrollToTopProps {
  history?: any;
}

const _AutoScrollToTop: React.FC<AutoScrollToTopProps> = ({ history }) => {
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unListen();
    };
  }, [history]);
  return null;
};

export const AutoScrollToTop = withRouter(_AutoScrollToTop);
