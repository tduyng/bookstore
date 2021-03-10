import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { BestSeller } from './BestSeller';
import { CustomSlider } from './CustomSlider';
import { Feature } from './Features';
import { Sale } from './Sale';
import { SliderNav } from './SliderNav';
import { Testimonial } from './Testimonial';

export const Landing = () => {
  const { sideBar } = useSelector((state: AppState) => state.ui);
  return (
    <div className={`main__landing${sideBar ? '' : ' center'}`}>
      <SliderNav />
      <BestSeller />
      <Sale />
      <Feature />
      <Testimonial />
      <CustomSlider />
    </div>
  );
};
