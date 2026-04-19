import { PrivateMatchGuestDialog } from "../src/js/dom-dialogs/private-match-guest";
import { domStub } from "./stub/dom-stub";

export default {
  title: "private-match-guest",
};

/** ダイアログ表示 */
export const dialog = domStub((params) => {
  const dialog = new PrivateMatchGuestDialog(params);
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed.");
  });
  dialog.notifyPrivateMatchStart().subscribe((roomID) => {
    console.log(`enter private match room ${roomID}`);
  });
  return dialog.getRootHTMLElement();
});

/** ルームID初期値あり */
export const initialRoomID = domStub((params) => {
  const dialog = new PrivateMatchGuestDialog({
    ...params,
    initialRoomID: "ありますよ",
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed.");
  });
  dialog.notifyPrivateMatchStart().subscribe((roomID) => {
    console.log(`enter private match room ${roomID}`);
  });
  return dialog.getRootHTMLElement();
});
