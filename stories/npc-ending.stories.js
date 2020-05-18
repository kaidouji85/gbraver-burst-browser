// @flow

import {domStub} from "./stub/dom-stub";
import {NPCEnding} from "../src/js/game/dom-scenes/npc-ending";

export default {
  title: 'npc-ending'
};

export const Scene = domStub((resourcePath) => {
  const scene = new NPCEnding(resourcePath);
  return scene.getRootHTMLElement();
});
