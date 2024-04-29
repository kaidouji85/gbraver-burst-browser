import { StoryFn } from "@storybook/html";

import { NetworkErrorDialog } from "../src/js/dom-dialogs/network-error/network-error-dialog";
import { Close } from "../src/js/game/post-network-error";
import { domStub } from "./stub/dom-stub";

export default {
  title: "network-error-dialog",
};

/** ダイアログ表示 */
export const dialog: StoryFn = domStub((params) => {
  const postNetworkError: Close = {
    type: "Close",
  };
  const dialog = new NetworkErrorDialog({ ...params, postNetworkError });
  dialog.notifyPostNetworkError().subscribe(() => {
    console.log("post network error");
  });
  return dialog.getRootHTMLElement();
});
