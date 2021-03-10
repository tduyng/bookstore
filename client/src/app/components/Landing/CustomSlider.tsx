import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

export const CustomSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };
  return (
    <div className="custom-slider">
      <Slider className="custom-slider__slider" {...settings}>
        <div className="custom-slider__slider--slides slide-1">
          <div className="custom-slider__slider--slides__content">
            <h2 className="custom-slider__slider--slides__content--title">
              brighter books
            </h2>
            <p className="custom-slider__slider--slides__content--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua
            </p>
            <Link className="custom-slider__slider--slides__content--link" to="#">
              Buy now
            </Link>
          </div>
        </div>
        <div className="custom-slider__slider--slides slide-2">
          <div className="custom-slider__slider--slides__content">
            <h2 className="custom-slider__slider--slides__content--title">
              book collection
            </h2>
            <p className="custom-slider__slider--slides__content--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt
            </p>
            <Link className="custom-slider__slider--slides__content--link" to="#">
              view collection
            </Link>
          </div>
        </div>
        <div className="custom-slider__slider--slides slide-3">
          <div className="custom-slider__slider--slides__content">
            <h2 className="custom-slider__slider--slides__content--title">huge sale</h2>
            <p className="custom-slider__slider--slides__content--para">
              Save up to 70% OFF Book Collection Shop now
            </p>
            <Link className="custom-slider__slider--slides__content--link" to="#">
              Shop now
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};
