import { NetworkErrorDialog } from "../src/js/dom-dialogs/network-error/network-error-dialog";
import { Close } from "../src/js/game/post-network-error";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "network-error-dialog",
};

export const dialog: DOMStubStory = domStub((resources) => {
  const postNetworkError: Close = {
    type: "Close",
  };
  const dialog = new NetworkErrorDialog(resources, postNetworkError);
  dialog.postNetworkErrorNotifier().subscribe(() => {
    console.log("post network error");
  });
  return dialog.getRootHTMLElement();
});
