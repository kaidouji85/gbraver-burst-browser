// @flow

import {domStub} from "./stub/dom-stub";
import {MatchCard} from "../src/js/game/dom-scenes/match-card";
import {ArmDozerIdList} from "gbraver-burst-core";

export default {
  title: 'match-card'
};

export const Scene = domStub(resources => {
  const scene = new MatchCard({
    resources: resources,
    player: ArmDozerIdList.LIGHTNING_DOZER,
    enemy: ArmDozerIdList.NEO_LANDOZER,
    caption: 'STAGE X',
  });
  return scene.getRootHTMLElement();
});
