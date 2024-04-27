import { MatchingDialog } from "../src/js/dom-dialogs/matching/matching-dialog";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "matching-dialog",
};
export const dialog: DOMStubStory = domStub((params) => {
  const dialog = new MatchingDialog(params);
  dialog.notifyMatchingCanceled().subscribe(() => {
    console.log("matching canceled");
  });
  return dialog.getRootHTMLElement();
});
