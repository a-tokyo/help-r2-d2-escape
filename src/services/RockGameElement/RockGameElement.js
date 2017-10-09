/* @flow */

import { GameElement } from '../';

// RockGameElement

export default class RockGameElement extends GameElement {
  constructor(name: string = 'rock0') {
    super('rock', name, true);
  }
}
