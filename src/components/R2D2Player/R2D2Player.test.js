import React from 'react';
import { shallow } from 'enzyme';
import R2D2Player from './R2D2Player';

it('renders without crashing', () => {
  shallow(<R2D2Player />);
});
