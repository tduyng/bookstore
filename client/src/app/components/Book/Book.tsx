import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from 'src/app/features/book/book.types';
import { addToCart } from 'src/app/features/user/user.actions';
import { CartItemDto } from 'src/app/features/user/user.types';
import { useAppDispatch } from 'src/store';
import toast from 'react-hot-toast';

type BookProps = IBook & { hideButton?: boolean };
export const Book: React.FC<BookProps> = props => {
  const dispatch = useAppDispatch();

  const { _id, title, price, old_price, imgURL } = props;
  const [btnText, setBtnText] = useState('Add to cart');

  const handleAddToCart = ({ _id, total }: CartItemDto) => {
    setBtnText('Adding ...');
    dispatch(addToCart({ _id, total })).then(unwrapResult => {
      setBtnText('Add to cart');
      if (unwrapResult.meta.requestStatus === 'fulfilled') {
        toast.success('Added product to Cart');
      } else {
        toast.error(`Can't add product to cart, please try later.`);
      }
    });
  };

  return (
    <div className="book">
      <Link to={`/book/${_id}`} className="book__link">
        <img className="book__link--img" src={imgURL} alt=""></img>
      </Link>
      <div className="book__content">
        <div className="book__content--name">{title}</div>
        <div className="book__content--price">
          {(price * 1000).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
        {old_price && (
          <div className="book__content--old-price">
            {(old_price * 1000).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
        )}

        {props.hideButton ? null : (
          <button
            onClick={() => handleAddToCart({ _id, total: 1 })}
            className="book__content--button"
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
};
