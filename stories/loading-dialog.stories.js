// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {LoadingDialog} from "../src/js/game/dom-dialogs/loading/loading-dialog";

export default {
  title: 'loading-dialog',
};
export const dialog: DOMStubStory = domStub(() => {
  const dialog = new LoadingDialog('通知中......');
  return dialog.getRootHTMLElement();
});