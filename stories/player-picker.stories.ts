import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerPickerDialog } from "../src/js/dom-dialogs/player-picker";
import { PlayableArmdozers } from "../src/js/game/playable-amdozers";
import { PlayablePilots } from "../src/js/game/playable-pilots";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-picker",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const playerPicker = new PlayerPickerDialog({
    ...options,
    armdozerIds: PlayableArmdozers,
    pilotIds: PlayablePilots,
    initialArmdozerId: ArmdozerIds.WING_DOZER,
    initialPilotId: PilotIds.YUUYA,
  });
  playerPicker.notifyGotoTitle().subscribe(() => {
    console.log("Goto Title button pressed");
  });
  playerPicker.notifyRetry().subscribe(({ armdozerId, pilotId }) => {
    console.log(`Retry button pressed: armdozerId=${armdozerId}, pilotId=${pilotId}`);
  });
  return playerPicker.getRootHTMLElement();
});
