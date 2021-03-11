import React from 'react';
import SkeletonBook from './SkeletonBook';

const books = () => {
  Array.from(Array(10).keys()).map(n => {
    return <SkeletonBook key={n} />;
  });
};
const SkeletonMultipleBooks = () => {
  return <>{books()}</>;
};

export default SkeletonMultipleBooks;
