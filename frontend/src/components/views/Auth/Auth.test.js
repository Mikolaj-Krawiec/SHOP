import React from 'react';
import { shallow } from 'enzyme';
import { AuthComponent } from './Auth';

describe('Component Auth', () => {
  it('should render without crashing', () => {
    const component = shallow(<AuthComponent />);
    expect(component).toBeTruthy();
  });
});
