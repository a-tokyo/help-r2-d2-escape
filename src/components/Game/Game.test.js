import React from 'react';
import { shallow } from 'enzyme';
import Game from './Game';

it('renders without crashing', () => {
  shallow(<Game />);
});
