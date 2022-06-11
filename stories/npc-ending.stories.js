// @flow

import {createBGMManager} from "../src/js/bgm/bgm-manager";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending/npc-ending";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'npc-ending'
};

export const Scene: DOMStubStory = domStub(resources => {
  const bgm = createBGMManager();
  const scene = new NPCEnding(resources, bgm);
  scene.playBGM();
  return scene.getRootHTMLElement();
});
