import { NetBattleSelectorDialog } from "../src/js/dom-dialogs/net-battle-selector";
import { domStub } from "./stub/dom-stub";

export default {
  title: "net-battle-selector",
};

/** ダイアログ表示 */
export const dialog = domStub((params) => {
  const dialog = new NetBattleSelectorDialog(params);
  dialog.notifyCasualMatchSelection().subscribe(() => {
    console.log("select casual match");
  });
  dialog.notifyPrivateMatchHostSelection().subscribe(() => {
    console.log("select private match host");
  });
  dialog.notifyPrivateMatchGuestSelection().subscribe(() => {
    console.log("select private match guest");
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
