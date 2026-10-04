import { PrivateMatchHostDialog } from "../src/js/game/scenes/dom-dialogs/private-match-host";
import { domStub } from "./stub/dom-stub";

export default {
  title: "private-match-host",
};

/** ダイアログ表示 */
export const dialog = domStub((params) => {
  const dialog = new PrivateMatchHostDialog({
    ...params,
    roomID: "あかんやろ",
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
