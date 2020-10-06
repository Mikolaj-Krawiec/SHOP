import React from 'react';
import { shallow } from 'enzyme';
import { ProfileComponent } from './Profile';

describe('Component Profile', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProfileComponent />);
    expect(component).toBeTruthy();
  });
});
