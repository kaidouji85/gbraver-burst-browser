import { RejectPrivateMatchEntryDialog } from "../src/js/dom-dialogs/reject-private-match-entry";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "reject-private-match-entry",
};

export const dialog: DOMStubStory = domStub(() => {
  const dialog = new RejectPrivateMatchEntryDialog();
  return dialog.getRootHTMLElement();
});
