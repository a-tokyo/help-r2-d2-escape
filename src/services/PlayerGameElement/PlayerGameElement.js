/* @flow */

import { GameElement } from '../';

// PlayerGameElement

export default class PlayerGameElement extends GameElement {
  constructor(name: string = 'player0') {
    super('player', name, true);
  }
}
