import {StoryFn} from "@storybook/html";

import { DifficultyDialog } from "../src/js/dom-dialogs/difficulty";
import { domStub } from "./stub/dom-stub";

export default {
  title: "difficulty",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const dialog = new DifficultyDialog(params);
  dialog.notifySelectionComplete().subscribe((diffuculty) => {
    console.log(diffuculty);
  });
  dialog.notifyClosed().subscribe(() => {
    console.log("close dialog");
  });
  return dialog.getRootHTMLElement();
});
