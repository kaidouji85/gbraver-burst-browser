// @flow

import {ArmDozerIds, PilotIds} from "gbraver-burst-core";
import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import {ArmdozerSelector} from "../src/js/game/dom-scenes/player-select/armdozer-selector";
import {PilotSelector} from "../src/js/game/dom-scenes/player-select/pilot-selector";
import {createPilotIcon} from "../src/js/game/dom-scenes/player-select/pilot-selector/create-pilot-icon";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'player-select',
};

export const scene: DOMStubStory = domStub(resources => {
  const scene = new PlayerSelect(resources);
  return scene.getRootHTMLElement();
});

export const pilotIcon: DOMStubStory = domStub(resources => {
  const icon = createPilotIcon(resources, PilotIds.SHINYA);
  icon.selectedNotifier().subscribe(() => {
    // NOP
  });
  return icon.getRootHTMLElement();
});

export const armdozerSelector: DOMStubStory = domStub(resources => {
  const armdozerIds = [
    ArmDozerIds.NEO_LANDOZER,
    ArmDozerIds.SHIN_BRAVER,
    ArmDozerIds.WING_DOZER,
    ArmDozerIds.LIGHTNING_DOZER,
  ];
  const component = new ArmdozerSelector(resources, armdozerIds, ArmDozerIds.SHIN_BRAVER);
  return component.getRootHTMLElement();
});

export const pilotSelector: DOMStubStory = domStub(resources => {
  const pilotIds = [
    PilotIds.SHINYA,
    PilotIds.GAI,
  ];
  const component = new PilotSelector(resources, pilotIds, PilotIds.SHINYA);
  return component.getRootHTMLElement();
});