import React from 'react';
import { shallow } from 'enzyme';
import { SwiperComponent } from './Swiper';

describe('Component Swiper', () => {
  it('should render without crashing', () => {
    const component = shallow(<SwiperComponent />);
    expect(component).toBeTruthy();
  });
});
