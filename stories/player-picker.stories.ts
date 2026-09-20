import { PlayerPickerDialog } from "../src/js/dom-dialogs/player-picker";
import { PlayableArmdozers } from "../src/js/game/playable-amdozers";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-picker",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const playerPicker = new PlayerPickerDialog({
    ...options,
    armdozerIds: PlayableArmdozers,
  });
  return playerPicker.getRootHTMLElement();
});
