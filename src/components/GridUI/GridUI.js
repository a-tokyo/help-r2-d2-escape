import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class componentName extends Component {
  static propTypes = {
    grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  };
  static defaultProps = {
    grid: [[]],
  };

  render() {
    const { grid } = this.props;
    return <div>grid goes here</div>;
  }
}
