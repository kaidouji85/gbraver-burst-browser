// @flow

import {domStub} from "./stub/dom-stub";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending";

export default {
  title: 'npc-ending'
};

export const Scene = domStub(resources => {
  const scene = new NPCEnding(resources);
  return scene.getRootHTMLElement();
});
