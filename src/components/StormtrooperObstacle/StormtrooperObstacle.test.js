import React from 'react';
import { shallow } from 'enzyme';
import StormtrooperObstacle from './StormtrooperObstacle';

it('renders without crashing', () => {
  shallow(<StormtrooperObstacle />);
});
