import { NetBattleSelectorDialog } from "../src/js/dom-dialogs/net-battle-selector";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "net-battle-selector",
};

export const dialog: DOMStubStory = domStub((resources, se) => {
  const dialog = new NetBattleSelectorDialog({resources, se});
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
