// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const Scene = domStub(resources => {
  const scene = new PlayerSelect(resources.path);
  return scene.getRootHTMLElement();
});