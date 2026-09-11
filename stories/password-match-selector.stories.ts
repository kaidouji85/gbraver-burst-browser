import { PasswordMatchSelectorDialog } from "../src/js/dom-dialogs/password-match-selector";
import { domStub } from "./stub/dom-stub";

export default {
  title: "password-match-selector",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const dialog = new PasswordMatchSelectorDialog(options);
  dialog.notifyHostSelection().subscribe(() => {
    console.log("password match host selected");
  });
  dialog.notifyGuestSelection().subscribe(() => {
    console.log("password match guest selected");
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
