import { PasswordMatchSelectorDialog } from "../src/js/dom-dialogs/password-match-selector";
import { domStub } from "./stub/dom-stub";

export default {
  title: "local-battle-selector",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const dialog = new PasswordMatchSelectorDialog(options);
  dialog.notifyHostSelection().subscribe(() => {
    console.log("local battle host selected");
  });
  dialog.notifyGuestSelection().subscribe(() => {
    console.log("local battle guest selected");
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
