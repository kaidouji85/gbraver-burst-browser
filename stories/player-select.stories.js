// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";

export default {
  title: 'player-select',
};

export const Scene = () => {
  const div = document.createElement('div');
  const scene = new PlayerSelect(div);
  return div;
}