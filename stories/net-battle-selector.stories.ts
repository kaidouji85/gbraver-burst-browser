import { NetBattleSelector } from "../src/js/dom-dialogs/net-battle-selector";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "net-battle-selector",
};

export const dialog: DOMStubStory = domStub((resources) => {
  const dialog = new NetBattleSelector(resources);
  dialog.notifyCasualMatchSelection().subscribe(() => {
    console.log("select casual match");
  });
  dialog.notifyPrivateMatchSelection().subscribe(() => {
    console.log("select private match");
  });
  return dialog.getRootHTMLElement();
});
