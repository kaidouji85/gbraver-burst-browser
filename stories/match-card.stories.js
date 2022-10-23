// @flow

import { ArmDozerIds } from "gbraver-burst-core";

import { MatchCard } from "../src/js/game/dom-scene-binder/scene/match-card";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "match-card",
};

export const Scene: DOMStubStory = domStub((resources) => {
  const scene = new MatchCard({
    resources: resources,
    player: ArmDozerIds.LIGHTNING_DOZER,
    enemy: ArmDozerIds.NEO_LANDOZER,
    caption: "STAGE X",
  });
  return scene.getRootHTMLElement();
});
