// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending/npc-ending";
import {createBGMManager} from "../src/js/game/bgm/bgm-manager";

export default {
  title: 'npc-ending'
};

export const Scene: DOMStubStory = domStub(resources => {
  const bgm = createBGMManager();
  const scene = new NPCEnding(resources, bgm);
  scene.playBGM();
  return scene.getRootHTMLElement();
});
