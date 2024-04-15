import { RejectPrivateMatchEntryDialog } from "../src/js/dom-dialogs/reject-private-match-entry";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "reject-private-match-entry",
};

export const dialog: DOMStubStory = domStub((params) => {
  const dialog = new RejectPrivateMatchEntryDialog(params);
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
