import { RejectPrivateMatchEntryDialog } from "../src/js/dom-dialogs/reject-private-match-entry";
import { domStub } from "./stub/dom-stub";

export default {
  title: "reject-private-match-entry",
};

/** ダイアログ表示 */
export const dialog = domStub((params) => {
  const dialog = new RejectPrivateMatchEntryDialog(params);
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
