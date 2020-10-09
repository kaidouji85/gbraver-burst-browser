// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PilotIds} from "gbraver-burst-core";
import {PilotIcon} from "../src/js/game/dom-scenes/player-select/pilot-icon";
import {PilotSelector} from "../src/js/game/dom-scenes/player-select/pilot-selector";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";
import {ArmdozerSelector} from "../src/js/game/dom-scenes/player-select/arndozer-selector";

export default {
  title: 'player-select',
};

export const scene: DOMStubStory = domStub(resources => {
  const scene = new PlayerSelect(resources);
  return scene.getRootHTMLElement();
});

export const pilotIcon: DOMStubStory = domStub(resources => {
  const icon = new PilotIcon(resources, PilotIds.SHINYA);
  icon.selectedNotifier().subscribe(() => {
    icon.selected();
  });
  return icon.getRootHTMLElement();
});

export const armdozerSelector: DOMStubStory = domStub(resources => {
  const armdozerIds = [
    ArmDozerIdList.NEO_LANDOZER,
    ArmDozerIdList.SHIN_BRAVER,
    ArmDozerIdList.WING_DOZER,
    ArmDozerIdList.LIGHTNING_DOZER,
  ];
  const component = new ArmdozerSelector(resources, armdozerIds);
  return component.getRootHTMLElement();
});

export const pilotSelector: DOMStubStory = domStub(resources => {
  const pilotIds = [
    PilotIds.SHINYA,
    PilotIds.GAI,
  ];
  const component = new PilotSelector(resources, pilotIds);
  return component.getRootHTMLElement();
});