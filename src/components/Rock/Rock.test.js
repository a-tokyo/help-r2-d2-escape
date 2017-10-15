import React from 'react';
import { shallow } from 'enzyme';
import Rock from './Rock';

it('renders without crashing', () => {
  shallow(<Rock />);
});
