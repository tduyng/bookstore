import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { PATH } from 'src/app/constants/paths.constant';
import { IUser } from 'src/app/features/user/user.types';
import { AppState } from 'src/store/reducers';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export const Payment = () => {
  const { cart } = useSelector((state: AppState) => state.user);
  const userAuth = useSelector((state: AppState) => state.user.user) as IUser;
  const [user, setUser] = useState({
    name: userAuth.username || '',
    email: userAuth.email || '',
    phone: '',
    country: '',
    region: '',
    district: '',
    ward: '',
  });

  const handleChange = (name: string) => (e: any) => {
    setUser({ ...user, [name]: e.target.value });
  };

  const selectCountry = (val: string) => {
    setUser({ ...user, country: val });
  };
  const selectRegion = (val: string) => {
    setUser({ ...user, region: val });
  };

  const total = cart
    .reduce(
      (sum, current) => sum + current.total * (current.price ? current.price * 1000 : 0),
      0,
    )
    .toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

  return (
    <div className="payment">
      {!cart.length ? <Redirect to={PATH.CHECKOUT} /> : null}
      <div className="payment__delivery">
        <h1>Delivery Address</h1>
        <div className="payment__delivery--address">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={handleChange('name')}
            className="payment__delivery--address__name"
            placeholder="Name"
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={user.email}
            onChange={handleChange('email')}
            className="payment__delivery--address__email"
            placeholder="Email"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            value={user.phone}
            onChange={handleChange('phone')}
            className="payment__delivery--address__phone"
            placeholder="Phone Number"
          />
          <label>Country</label>
          <CountryDropdown
            value={user.country}
            onChange={val => selectCountry(val)}
            classes="payment__delivery--address__country"
          />
          <label>Region</label>
          <RegionDropdown
            country={user.country}
            value={user.region}
            onChange={val => selectRegion(val)}
            classes="payment__delivery--address__region"
          />
          <label htmlFor="district">District:</label>
          <input
            id="district"
            type="text"
            value={user.district}
            onChange={handleChange('district')}
            className="payment__delivery--address__district"
            disabled={user.region ? false : true}
            placeholder="District"
          />
          <label htmlFor="ward">Wards:</label>
          <input
            id="ward"
            type="text"
            value={user.ward}
            onChange={handleChange('ward')}
            className="payment__delivery--address__ward"
            disabled={user.district ? false : true}
            placeholder="Wards"
          />
        </div>
      </div>
      <div className="payment__info">
        <h1>Order infomation</h1>
        {cart.map(item => (
          <div className="payment__info--product" key={item._id}>
            <div className="payment__info--product__img">
              <img src={item.imgURL} alt="Product" />
            </div>
            <div className="payment__info--product__info">
              <p className="payment__info--product__info--title">{item.title}</p>
              <div className="payment__info--product__info--money">
                <p className="payment__info--product__info--money__price">
                  {(item.price ? item.price * 1000 : 0).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </p>
                <p className="payment__info--product__info--money__amount">
                  Qty: {item.total}
                </p>
                <p className="payment__info--product__info--money__total">
                  {(item.price ? item.price * item.total * 1000 : 0).toLocaleString(
                    'vi-VN',
                    {
                      style: 'currency',
                      currency: 'VND',
                    },
                  )}
                </p>
              </div>
            </div>
            <div className="payment__info--product__amount">
              <p className="payment__info--product__amount--price">
                {(item.price ? item.price * 1000 : 0).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
              <p className="payment__info--product__amount--total">{item.total}</p>
              <p className="payment__info--product__amount--money">
                {(item.price ? item.price * item.total * 1000 : 0).toLocaleString(
                  'vi-VN',
                  {
                    style: 'currency',
                    currency: 'VND',
                  },
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="payment__confirm">
        <div className="payment__confirm--money">
          <div className="payment__confirm--money__total">
            <p>Money:</p>
            <p>{total}</p>
          </div>
          <div className="payment__confirm--money__ship">
            <p>Shipping fee:</p>
            <p>
              {Number(0).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
          </div>
          <div className="payment__confirm--money__final">
            <p>
              <b>Total:</b>
            </p>
            <p>{total}</p>
          </div>
        </div>
        <div className="payment__confirm--checkout">
          <Link to="/checkout" className="payment__confirm--checkout__back">
            Back to Checkout
          </Link>
          <button className="payment__confirm--checkout__button">Confirm Checkout</button>
        </div>
      </div>
    </div>
  );
};
