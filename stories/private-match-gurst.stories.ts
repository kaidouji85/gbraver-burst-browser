import { PrivateMatchGuestDialog } from "../src/js/dom-dialogs/private-match-guest";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "private-match-guest",
};

export const dialog: DOMStubStory = domStub(() => {
  const dialog = new PrivateMatchGuestDialog();
  return dialog.getRootHTMLElement();
});
