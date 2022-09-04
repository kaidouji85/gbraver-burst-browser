// @flow

import {ArmDozerIdList} from "gbraver-burst-core";
import {StageTitle} from "../src/js/game/dom-scenes/stage-title/stage-title";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'stage-title'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new StageTitle(resources, 10, ['敵より大きい', 'バッテリーを出せ'], ArmDozerIdList.NEO_LANDOZER);
  return scene.getRootHTMLElement();
});
