import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { removeFromCart } from 'src/app/features/user/user.actions';
import { CartItem } from 'src/app/features/user/user.types';
import { useAppDispatch } from 'src/store';
import noImage from '/no-image.png';

export const Product: React.FC<CartItem> = props => {
  const dispatch = useAppDispatch();
  const id = props._id as string;
  const [inpValue, setInpValue] = useState(props.total || 1);
  const [amount, setAmount] = useState(props.total || 1);

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const handleChange = (e: any) => {
    if (isNaN(e.target.value)) {
      setInpValue(amount);
    } else if (parseInt(e.target.value) > 99) {
      setInpValue(99);
    } else {
      setInpValue(e.target.value);
    }
  };

  const updateAmount = (e: any) => {
    if (
      !e.target.value ||
      parseInt(e.target.value) === 0 ||
      parseInt(e.target.value) > 99
    ) {
      setInpValue(amount);
    } else {
      setAmount(parseInt(e.target.value));
      setInpValue(parseInt(e.target.value));
    }
  };

  const deleteProduct = (_id: string) => {
    dispatch(removeFromCart({ _id })).then(result => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Remove cart item');
      }
    });
  };

  return (
    <div className="checkout__product">
      <i className="fas fa-times" onClick={() => deleteProduct(id)}></i>
      <Link to={`/book/${id}`} className="checkout__product--img">
        <img src={props.imgURL || noImage} alt="Product" />
      </Link>
      <div className="checkout__product--detail">
        <p className="checkout__product--detail__name">{props.title}</p>
        <p className="checkout__product--detail__price">
          {formatter.format(
            parseFloat(props.price ? props.price.toString() : '0') * 1000,
          )}
        </p>
        {props.old_price && (
          <p className="checkout__product--detail__old-price">
            {formatter.format(parseFloat(props.old_price.toString()) * 1000)}
          </p>
        )}
      </div>
      <div className="checkout__product--amount">
        <input
          type="text"
          value={inpValue}
          onChange={handleChange}
          onBlur={updateAmount}
        />
        <p className="checkout__product--amount__total">Total:</p>
        <p className="checkout__product--amount__money">
          {formatter.format(inpValue * (props.price ? props.price * 1000 : 0))}
        </p>
      </div>
    </div>
  );
};

Product.defaultProps = {
  total: 1,
};
