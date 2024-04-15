import { DifficultyDialog } from "../src/js/dom-dialogs/difficulty";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "difficulty",
};

export const dialog: DOMStubStory = domStub((params) => {
  const dialog = new DifficultyDialog(params);
  dialog.notifySelectionComplete().subscribe((diffuculty) => {
    console.log(diffuculty);
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("close dialog");
  });
  return dialog.getRootHTMLElement();
});
