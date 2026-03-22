import { LocalBattleGuestDialog } from "../src/js/dom-dialogs/local-battle-guest";
import { domStub } from "./stub/dom-stub";

export default {
  title: "local-battle-guest",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const dialog = new LocalBattleGuestDialog(options);
  return dialog.getRootHTMLElement();
});
