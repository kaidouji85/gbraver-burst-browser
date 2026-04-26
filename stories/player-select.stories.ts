import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerSelect } from "../src/js/dom-scenes/player-select";
import { ArmdozerSelector } from "../src/js/dom-scenes/player-select/armdozer-selector";
import { PilotSelector } from "../src/js/dom-scenes/player-select/pilot-selector";
import { PlayableArmdozers } from "../src/js/game/playable-amdozers";
import { PlayablePilots } from "../src/js/game/playable-pilots";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-select",
};

/** シーン表示 */
export const scene = domStub((params) => {
  const scene = new PlayerSelect({
    ...params,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
    battleMode: "アーケード",
  });
  return scene.getRootHTMLElement();
});
