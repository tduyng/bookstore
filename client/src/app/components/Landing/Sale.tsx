import React from 'react';
import { Link } from 'react-router-dom';

export const Sale = () => {
  return (
    <div className="sale">
      <div className="sale__img">
        <div className="sale__img--content">
          <p className="sale__img--content__para">holiday season sale</p>
          <h2 className="sale__img--content__title">off up to 45% for all books</h2>
          <Link className="sale__img--content__link" to="#">
            Buy now
          </Link>
        </div>
      </div>
      <div className="sale__feature">
        <div className="sale__feature--content content-1">
          <h2 className="content-1__title">free delivery</h2>
          <p className="content-1__para">on orders over $99</p>
        </div>
        <div className="sale__feature--content content-2">
          <p className="content-2__para">Featured</p>
          <h2 className="content-2__title">photography books</h2>
        </div>
        <div className="sale__feature--content content-3">
          <h2 className="content-3__title">keep reading</h2>
          <p className="content-3__para">reading is the best for get idea</p>
        </div>
        <div className="sale__feature--content content-4">
          <p className="content-4__para">new books</p>
          <h2 className="content-4__title">70% off</h2>
          <Link className="content-4__link" to="#">
            see more
          </Link>
        </div>
      </div>
    </div>
  );
};
