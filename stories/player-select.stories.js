// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const Scene = domStub((resourcePath) => {
  const scene = new PlayerSelect(resourcePath);
  scene.show();
  return scene.getRootHTMLElement();
});