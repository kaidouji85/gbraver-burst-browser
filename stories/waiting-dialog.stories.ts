import { StoryFn } from "@storybook/html";

import { WaitingDialog } from "../src/js/dom-dialogs/waiting/waiting-dialog";
import { domStub } from "./stub/dom-stub";

export default {
  title: "waiting-dialog",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub(() => {
  const dialog = new WaitingDialog("通知中......");
  return dialog.getRootHTMLElement();
});
