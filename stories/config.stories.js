// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Config} from "../src/js/game/dom-scenes/config/config";
import {ConfigChangedDialog} from "../src/js/game/dom-scenes/config/config-changed-dialog";

export default {
  title: 'config'
};

export const Scene: DOMStubStory = domStub(resources => {
  const config = {webGLPixelRatio: 2, battleAnimeSpeed: 1};
  const scene = new Config(resources, config);
  scene.prevNotifier().subscribe(() => {
    console.log('prev');
  });
  scene.configChangeNotifier().subscribe((config) => {
    console.log('config change');
    console.log(config);
  });
  return scene.getRootHTMLElement();
});

export const ConfigChanged: DOMStubStory = domStub(resources => {
  const dialog = new ConfigChangedDialog(resources);
  dialog.show();
  dialog.closeNotifier().subscribe(() => {
    console.log('on close');
  });
  dialog.discardNotifier().subscribe(() => {
    console.log('on discard');
  });
  dialog.acceptNotifier().subscribe(() => {
    console.log('on accept');
  });
  return dialog.getRootHTMLElement();
});

