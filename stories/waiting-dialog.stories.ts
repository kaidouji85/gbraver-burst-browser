import { WaitingDialog } from "../src/js/dom-dialogs/waiting/waiting-dialog";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "waiting-dialog"
};
export const dialog: DOMStubStory = domStub(() => {
  const dialog = new WaitingDialog("通知中......");
  return dialog.getRootHTMLElement();
});