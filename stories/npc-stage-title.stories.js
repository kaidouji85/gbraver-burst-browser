// @flow

import {domStub} from "./stub/dom-stub";
import {NpcStageTitle} from "../src/js/game/dom-scenes/npc-stage-title/npc-stage-title";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'npc-stage-title'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new NpcStageTitle(resources);
  return scene.getRootHTMLElement();
});
