import { LocalBattleGuestDialog } from "../src/js/dom-dialogs/local-battle-guest";
import { domStub } from "./stub/dom-stub";

export default {
  title: "local-battle-guest",
};

/** ダイアログ表示 */
export const dialog = domStub((options) => {
  const dialog = new LocalBattleGuestDialog(options);
  dialog.notifyBattleStart().subscribe((payload) => {
    console.log(`battle start ${payload.password}`);
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});

/** 失敗メッセージ表示 */
export const failed = domStub((options) => {
  const dialog = new LocalBattleGuestDialog({
    ...options,
    initialRoomId: "ないよそん",
  });
  dialog.notifyBattleStart().subscribe((payload) => {
    console.log(`battle start ${payload.password}`);
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  dialog.flushFailedMessage();
  return dialog.getRootHTMLElement();
});
