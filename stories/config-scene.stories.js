// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {ConfigScene} from "../src/js/game/dom-scenes/config/config-scene";

export default {
  title: 'config-scene'
};

export const Scene: DOMStubStory = domStub(resources => {
  const config = {webGLPixelRatio: 2};
  const scene = new ConfigScene(config);
  return scene.getRootHTMLElement();
});
