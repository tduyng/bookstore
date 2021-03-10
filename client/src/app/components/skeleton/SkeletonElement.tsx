import React from 'react';

const SkeletonElement = ({ type }) => {
  return <div className={`skeleton ${type}`}></div>;
};

export default SkeletonElement;
