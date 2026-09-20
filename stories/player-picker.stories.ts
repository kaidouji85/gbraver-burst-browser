import { PlayerPickerDialog } from "../src/js/dom-dialogs/player-picker";
import { domStub } from "./stub/dom-stub";

export default {
  title: "player-picker",
};

/** ダイアログ表示 */
export const dialog = domStub(() => {
  const playerPicker = new PlayerPickerDialog();
  return playerPicker.getRootHTMLElement();
});
