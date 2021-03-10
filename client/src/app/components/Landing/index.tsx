import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { BestSeller } from './BestSeller';
import { Feature } from './Features';
import { Sale } from './Sale';
import { SliderNav } from './SliderNav';
import { Testimonial } from './Testimonial';

const mapStateToProps = (state: AppState) => ({
  sideBar: state.ui.sideBar
});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface LandingProps extends ConnectedProps<typeof connector> {}

export const Landing: React.FC<LandingProps> = (props: LandingProps) => {

  return (
    <div className={`main__landing${props.sideBar ? '' : ' center'}`}>
      <SliderNav />
      <BestSeller />
      <Sale />
      <Feature />
      <Testimonial />
      <CustomSlider />
    </div>
  );
};

export
