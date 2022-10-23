// @flow

import { NetworkErrorDialog } from "../src/js/dom-dialogs/network-error/network-error-dialog";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "network-error-dialog",
};
export const dialog: DOMStubStory = domStub((resources) => {
  const postNetworkError = { type: "Close" };
  const dialog = new NetworkErrorDialog(resources, postNetworkError);
  dialog.postNetworkErrorNotifier().subscribe(() => {
    console.log("post network error");
  });
  return dialog.getRootHTMLElement();
});
