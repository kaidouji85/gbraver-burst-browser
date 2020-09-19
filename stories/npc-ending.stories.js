// @flow

import {domStub} from "./stub/dom-stub";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'npc-ending'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new NPCEnding(resources);
  return scene.getRootHTMLElement();
});
