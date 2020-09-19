// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new PlayerSelect(resources);
  return scene.getRootHTMLElement();
});