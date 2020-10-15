import React from 'react';
import { shallow } from 'enzyme';
import { ProtectedRouteComponent } from './ProtectedRoute';

describe('Component ProtectedRoute', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProtectedRouteComponent />);
    expect(component).toBeTruthy();
  });
});
