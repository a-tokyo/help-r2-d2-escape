import React from 'react';
import { shallow } from 'enzyme';
import GridUI from './GridUI';
import { Store } from '../../services';

it('renders without crashing', () => {
  shallow(<GridUI gridInfo={Store.gameGrids.solvableLongGrid} />);
});
