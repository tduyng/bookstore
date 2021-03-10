import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

interface ArrowProps {
  className?: string;
  onClick?: () => void;
}
const NextArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} icon next`} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} icon prev`} onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

export const SliderNav = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div className="main__slider-nav">
      <Slider className="main__slider-nav--slides" {...settings}>
        <div className="main__slider-nav--slides__slide slide-1">
          <div className="slide-1__content">
            <p className="slide-1__content--para">collection 2021</p>
            <h2 className="slide-1__content--title">Holiday Season</h2>
            <span className="slide-1__content--span">
              Lorem Ipsum is simply dummy text of the printing
            </span>
            <Link to="#" className="slide-1__content--link">
              <div className="slide-1__content--link__content">Shop now</div>
              <i className="fas fa-caret-right"></i>
            </Link>
          </div>
        </div>
        <div className="main__slider-nav--slides__slide slide-2">
          <div className="slide-2__content">
            <p className="slide-2__content--para">clearance sale</p>
            <h2 className="slide-2__content--title">collection</h2>
            <span className="slide-2__content--span">
              Lorem Ipsum is simply dummy text of the printing
            </span>
            <Link to="#" className="slide-2__content--link">
              <div className="slide-2__content--link__content">Buy now</div>
              <i className="fas fa-caret-right"></i>
            </Link>
          </div>
        </div>
      </Slider>
    </div>
  );
};
