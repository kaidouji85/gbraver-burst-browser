import { DifficultyDialog } from "../src/js/dom-dialogs/difficulty";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";
export default {
  title: "difficulty",
};
export const dialog: DOMStubStory = domStub((resources) => {
  const dialog = new DifficultyDialog(resources);
  dialog.selectionCompleteNotifier().subscribe((diffuculty) => {
    console.log(diffuculty);
  });
  dialog.closeDialogNotifier().subscribe(() => {
    console.log("close dialog");
  });
  return dialog.getRootHTMLElement();
});
