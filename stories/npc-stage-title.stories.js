// @flow

import {domStub} from "./stub/dom-stub";
import {NPCStageTitle} from "../src/js/game/dom-scenes/npc-stage-title/npc-stage-title";
import type {DOMStubStory} from "./stub/dom-stub";
import {ArmDozerIdList} from "gbraver-burst-core";

export default {
  title: 'npc-stage-title'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new NPCStageTitle(resources, 10, ['敵より大きい', 'バッテリーを出せ'], ArmDozerIdList.NEO_LANDOZER);
  return scene.getRootHTMLElement();
});
