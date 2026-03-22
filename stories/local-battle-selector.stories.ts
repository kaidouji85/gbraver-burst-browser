import { LocalBattleSelectorDialog } from "../src/js/dom-dialogs/local-battle-selector";
import { domStub } from "./stub/dom-stub";

export default {
  title: "local-battle-selector",
};

/** ダイアログ表示 */
export const dialog = domStub(() => {
  const dialog = new LocalBattleSelectorDialog();
  return dialog.getRootHTMLElement();
});
