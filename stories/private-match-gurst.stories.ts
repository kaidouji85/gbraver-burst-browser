import { PrivateMatchGuestDialog } from "../src/js/dom-dialogs/private-match-guest";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "private-match-guest",
};

export const dialog: DOMStubStory = domStub((resources) => {
  const dialog = new PrivateMatchGuestDialog(resources);
  return dialog.getRootHTMLElement();
});
