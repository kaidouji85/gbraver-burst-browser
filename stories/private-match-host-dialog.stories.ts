import { StoryFn } from "@storybook/html";

import { PrivateMatchHostDialog } from "../src/js/dom-dialogs/private-match-host";
import { domStub } from "./stub/dom-stub";

export default {
  title: "private-match-host",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const dialog = new PrivateMatchHostDialog({
    ...params,
    roomID: "V1StGXR8_Z5jdHi6B-myT",
  });
  dialog.notifyDialogClosed().subscribe(() => {
    console.log("dialog closed");
  });
  return dialog.getRootHTMLElement();
});
