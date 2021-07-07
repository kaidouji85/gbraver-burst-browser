// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {NetworkErrorDialog} from "../src/js/game/dom-dialogs/network-error/network-error-dialog"

export default {
  title: 'network-error-dialog',
};
export const dialog: DOMStubStory = domStub(() => {
  const dialog = new NetworkErrorDialog('閉じる');
  dialog.nextActionNotifier().subscribe(() => {
    console.log('next action');
  });
  return dialog.getRootHTMLElement();
});