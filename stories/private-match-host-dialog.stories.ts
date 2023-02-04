import { PrivateMatchHostDialog } from "../src/js/dom-dialogs/private-match-host";
import { domStub, DOMStubStory } from "./stub/dom-stub";

export default {
  title: "private-match-host",
};

export const dialog: DOMStubStory = domStub((resources) => {
  const dialog = new PrivateMatchHostDialog(resources, "V1StGXR8_Z5jdHi6B-myT");
  return dialog.getRootHTMLElement();
});
