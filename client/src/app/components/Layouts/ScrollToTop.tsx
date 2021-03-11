import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const checkIfShow = () => {
      if (!showScroll && window.pageYOffset > 230) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset < 230) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkIfShow);
  }, [showScroll, setShowScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`scroll${showScroll ? ' active' : ''}`} onClick={scrollToTop}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
