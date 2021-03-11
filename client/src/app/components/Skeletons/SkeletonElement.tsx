import React from 'react';

interface SkeletonElementProps {
  type: string;
}
export const SkeletonElement: React.FC<SkeletonElementProps> = ({ type }) => {
  return <div className={`skeleton ${type}`}></div>;
};
