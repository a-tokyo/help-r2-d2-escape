import React from 'react';
import { shallow } from 'enzyme';
import GridUI from './GridUI';

it('renders without crashing', () => {
  shallow(<GridUI />);
});
