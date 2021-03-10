import React from "react";
import Shimmer from "./Shimmer";

import SkeletonElement from "./SkeletonElement";

const SkeletonBook = () => {
  return (
    <div className="skeleton-wrapper">
      <SkeletonElement type="img" />
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <SkeletonElement type="text" />
      <Shimmer />
    </div>
  );
};

export default SkeletonBook;
