import { ArmDozerIds } from "gbraver-burst-core";

import { StageTitle } from "../src/js/dom-scenes/stage-title";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "stage-title",
};

export const npcBattle: DOMStubStory = domStub((resources) => {
  const scene = new StageTitle({
    resources,
    level: 10,
    caption: ["敵より大きいバッテリーを出せ"],
    armDozerId: ArmDozerIds.NEO_LANDOZER,
  });
  return scene.getRootHTMLElement();
});

export const multiCaption: DOMStubStory = domStub((resources) => {
  const scene = new StageTitle({
    resources,
    level: 10,
    caption: ["音速の騎士", "ウィングドーザ"],
    armDozerId: ArmDozerIds.WING_DOZER,
  });
  return scene.getRootHTMLElement();
});
