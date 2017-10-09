/* @flow */

import { GameElement } from '../';

// ObstacleGameElement

export default class ObstacleGameElement extends GameElement {
  constructor(name: string = 'obstacle0') {
    super('obstacle', name, false);
  }
}
