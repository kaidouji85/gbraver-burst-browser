// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending/npc-ending";

export default {
  title: 'npc-ending'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new NPCEnding(resources);
  return scene.getRootHTMLElement();
});
