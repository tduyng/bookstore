import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingIndicator = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <ReactLoading type="bars" height={'10%'} width={'80%'} color="#cccbcb" />;
    </div>
  );
};
