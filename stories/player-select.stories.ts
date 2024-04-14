import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerSelect } from "../src/js/dom-scenes/player-select";
import { ArmdozerSelector } from "../src/js/dom-scenes/player-select/armdozer-selector";
import { PilotSelector } from "../src/js/dom-scenes/player-select/pilot-selector";
import { PlayableArmdozers } from "../src/js/game/playable-amdozers";
import { PlayablePilots } from "../src/js/game/playable-pilots";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-select",
};

export const scene: DOMStubStory = domStub((resources, se) => {
  const scene = new PlayerSelect({
    resources,
    se,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
  });
  return scene.getRootHTMLElement();
});

export const armdozerSelector: DOMStubStory = domStub((resources, se) => {
  const armdozerIds = [
    ArmdozerIds.NEO_LANDOZER,
    ArmdozerIds.SHIN_BRAVER,
    ArmdozerIds.WING_DOZER,
    ArmdozerIds.LIGHTNING_DOZER,
  ];
  const component = new ArmdozerSelector({
    resources,
    se,
    armdozerIds,
    initialArmdozerId: ArmdozerIds.SHIN_BRAVER,
  });
  return component.getRootHTMLElement();
});

export const pilotSelector: DOMStubStory = domStub((resources) => {
  const pilotIds = [PilotIds.SHINYA, PilotIds.GAI];
  const component = new PilotSelector(resources, pilotIds, PilotIds.SHINYA);
  return component.getRootHTMLElement();
});
