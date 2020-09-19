// @flow

import {domStub} from "./stub/dom-stub";
import {MatchCard} from "../src/js/game/dom-scenes/match-card";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {DOMStubStory} from "./stub/dom-stub";

export default {
  title: 'match-card'
};

export const Scene: DOMStubStory = domStub(resources => {
  const scene = new MatchCard({
    resources: resources,
    player: ArmDozerIdList.LIGHTNING_DOZER,
    enemy: ArmDozerIdList.NEO_LANDOZER,
    caption: 'STAGE X',
  });
  return scene.getRootHTMLElement();
});
