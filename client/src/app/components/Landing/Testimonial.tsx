import React from 'react';
import Slider from 'react-slick';

import member1 from 'src/assets/img/member1.jpg';
import member2 from 'src/assets/img/member2.jpg';
import member3 from 'src/assets/img/member3.jpg';
import member4 from 'src/assets/img/member4.jpg';

export const Testimonial = () => {
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
    <div className="testimonial">
      <Slider className="testimonial__slider" {...settings}>
        <div className="testimonial__slider--slides">
          <div className="testimonial__slider--slides__inner">
            <img src={member1} alt="members" />
            <p className="testimonial__slider--slides__inner--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>
            <p className="testimonial__slider--slides__inner--name">Saraha Smith</p>
          </div>
        </div>
        <div className="testimonial__slider--slides">
          <div className="testimonial__slider--slides__inner">
            <img src={member2} alt="members" />
            <p className="testimonial__slider--slides__inner--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua
            </p>
            <p className="testimonial__slider--slides__inner--name">Mark Doe</p>
          </div>
        </div>
        <div className="testimonial__slider--slides">
          <div className="testimonial__slider--slides__inner">
            <img src={member3} alt="members" />
            <p className="testimonial__slider--slides__inner--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt
            </p>
            <p className="testimonial__slider--slides__inner--name">John Doe</p>
          </div>
        </div>
        <div className="testimonial__slider--slides">
          <div className="testimonial__slider--slides__inner">
            <img src={member4} alt="members" />
            <p className="testimonial__slider--slides__inner--para">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <p className="testimonial__slider--slides__inner--name">Stephen Doe</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};
