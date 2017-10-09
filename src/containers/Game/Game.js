import React, { Component } from 'react';

import { GridUI } from '../../components';
import { generateGrid } from '../../services';

export default class Game extends Component {
  componentDidMount() {
    generateGrid();
  }

  render() {
    return (
      <div>
        Game !!
        <GridUI />
      </div>
    );
  }
}
