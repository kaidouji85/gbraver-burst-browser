// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Config} from "../src/js/game/dom-scenes/config/config";

export default {
  title: 'config-scene'
};

export const Scene: DOMStubStory = domStub(() => {
  const config = {webGLPixelRatio: 2};
  const scene = new Config(config);
  scene.prevNotifier().subscribe(() => {
    console.log('prev');
  });
  scene.configChangeNotifier().subscribe((config) => {
    console.log('config change');
    console.log(config);
  });
  return scene.getRootHTMLElement();
});
