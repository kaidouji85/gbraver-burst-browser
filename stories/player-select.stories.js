// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import {DOMStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const Scene = () => {
  const stub = new DOMStub((parent, resourcePath) => {
    const scene = new PlayerSelect(parent);
  });
  return stub.domElement();
}