import { StoryFn } from "@storybook/html";

import { MatchingDialog } from "../src/js/dom-dialogs/matching/matching-dialog";
import { domStub } from "./stub/dom-stub";

export default {
  title: "matching-dialog",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const dialog = new MatchingDialog(params);
  dialog.notifyMatchingCanceled().subscribe(() => {
    console.log("matching canceled");
  });
  return dialog.getRootHTMLElement();
});
