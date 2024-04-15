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

export const scene: DOMStubStory = domStub((params) => {
  const scene = new PlayerSelect({
    ...params,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
  });
  return scene.getRootHTMLElement();
});

export const armdozerSelector: DOMStubStory = domStub((params) => {
  const armdozerIds = [
    ArmdozerIds.NEO_LANDOZER,
    ArmdozerIds.SHIN_BRAVER,
    ArmdozerIds.WING_DOZER,
    ArmdozerIds.LIGHTNING_DOZER,
  ];
  const component = new ArmdozerSelector({
    ...params,
    armdozerIds,
    initialArmdozerId: ArmdozerIds.SHIN_BRAVER,
  });
  return component.getRootHTMLElement();
});

export const pilotSelector: DOMStubStory = domStub((params) => {
  const pilotIds = [PilotIds.SHINYA, PilotIds.GAI];
  const component = new PilotSelector({
    ...params,
    pilotIds,
    initialPilotId: PilotIds.SHINYA,
  });
  return component.getRootHTMLElement();
});
