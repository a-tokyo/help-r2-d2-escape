/* @flow */
/* eslint import/no-extraneous-dependencies: 0 */
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/* setting up test mocks for react tests. */
Enzyme.configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
