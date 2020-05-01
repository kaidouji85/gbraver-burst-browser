// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const Scene = () => {
  return domStub((resourcePath) => {
    const scene = new PlayerSelect(resourcePath);
    return scene.getRootHTMLElement();
  });
}