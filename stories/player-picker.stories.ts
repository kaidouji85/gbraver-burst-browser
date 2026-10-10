import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerPickerDialog } from "../src/js/game/dialogs/player-picker";
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
    confirmLabel: "🌟再戦",
    closeLabel: "タイトルへ",
  });
  playerPicker.notifyConfirm().subscribe(() => {
    console.log("close");
  });
  playerPicker.notifyClose().subscribe(({ armdozerId, pilotId }) => {
    console.log(`confirmP: armdozerId=${armdozerId}, pilotId=${pilotId}`);
  });
  return playerPicker.getRootHTMLElement();
});
