import { WaitingDialog } from "../src/js/game/dialogs/waiting/waiting-dialog";
import { domStub } from "./stub/dom-stub";

export default {
  title: "waiting-dialog",
};

/** ダイアログ表示 */
export const dialog = domStub(() => {
  const dialog = new WaitingDialog("通知中......");
  return dialog.getRootHTMLElement();
});
