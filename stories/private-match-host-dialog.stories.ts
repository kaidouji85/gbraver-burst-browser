import { PrivateMatchHostDialog } from "../src/js/dom-dialogs/private-match-host";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "private-match-host",
};

export const dialog: DOMStubStory = domStub((resources, se) => {
  const dialog = new PrivateMatchHostDialog({
    resources,
    se,
    roomID: "V1StGXR8_Z5jdHi6B-myT",
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
