// @flow

import {PlayerSelect} from "../src/js/game/dom-scenes/player-select";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";
import {PilotIcon} from "../src/js/game/dom-scenes/player-select/pilot-icon";

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