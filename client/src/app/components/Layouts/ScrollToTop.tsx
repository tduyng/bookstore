import React, { useState } from 'react';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const checkIfShow = () => {
    if (!showScroll && window.pageYOffset > 230) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset < 230) {
      setShowScroll(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  window.addEventListener('scroll', checkIfShow);
  return (
    <div className={`scroll${showScroll ? ' active' : ''}`} onClick={scrollToTop}>
      <i className="fas fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
