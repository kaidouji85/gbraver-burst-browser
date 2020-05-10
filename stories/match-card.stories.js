// @flow

import {domStub} from "./stub/dom-stub";
import {MatchCard} from "../src/js/game/dom-scenes/match-card";
import {ArmdozerAppearances, ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

export default {
  title: 'match-card'
};

export const Scene = domStub((resourcePath) => {
  const scene = new MatchCard({
    resourcePath: resourcePath,
    player: ArmDozerIdList.LIGHTNING_DOZER,
    enemy: ArmDozerIdList.NEO_LANDOZER,
    caption: 'STAGE X',
  });
  return scene.getRootHTMLElement();
});
