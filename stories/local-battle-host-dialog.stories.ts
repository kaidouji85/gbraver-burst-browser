import { LocalBattleHostDialog } from "../src/js/dom-dialogs/local-battle-host";
import { domStub } from "./stub/dom-stub";

export default {
  title: "local-battle-host",
};

/** ダイアログ表示 */
export const dialog = domStub(() => {
  const dialog = new LocalBattleHostDialog();
  return dialog.getRootHTMLElement();
});
