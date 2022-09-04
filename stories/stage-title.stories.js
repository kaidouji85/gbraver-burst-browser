// @flow

import {ArmDozerIdList} from "gbraver-burst-core";
import {StageTitle} from "../src/js/game/dom-scenes/stage-title/stage-title";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'stage-title'
};

export const npcBattle: DOMStubStory = domStub(resources => {
  const scene = new StageTitle({resources, stagePrefix: 'NPCBattle', level: 10, caption: ['敵より大きい', 'バッテリーを出せ'],
    armDozerId: ArmDozerIdList.NEO_LANDOZER});
  return scene.getRootHTMLElement();
});

export const tutorial: DOMStubStory = domStub(resources => {
  const scene = new StageTitle({resources, stagePrefix: 'Tutorial', level: 2, caption: ['バッテリーシステムの', '基本'],
    armDozerId: ArmDozerIdList.WING_DOZER});
  return scene.getRootHTMLElement();
});