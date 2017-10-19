import React from 'react';
import { shallow } from 'enzyme';
import GridUI from './GridUI';
import { solvableLongGrid } from '../../services/generateGrid/testGrids';

it('renders without crashing', () => {
  shallow(<GridUI gridInfo={solvableLongGrid} />);
});
