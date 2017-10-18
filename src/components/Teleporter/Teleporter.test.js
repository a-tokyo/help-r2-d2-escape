import React from 'react';
import { shallow } from 'enzyme';
import Teleporter from './Teleporter';

it('renders without crashing', () => {
  shallow(<Teleporter />);
});
