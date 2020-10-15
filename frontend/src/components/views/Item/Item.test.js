import React from 'react';
import { shallow } from 'enzyme';
import { ItemComponent } from './Item';

describe('Component Item', () => {
  it('should render without crashing', () => {
    const component = shallow(<ItemComponent />);
    expect(component).toBeTruthy();
  });
});
