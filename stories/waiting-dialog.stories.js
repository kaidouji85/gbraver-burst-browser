// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {WaitingDialog} from "../src/js/game/dom-dialogs/waiting/waiting-dialog";

export default {
  title: 'waiting-dialog',
};
export const dialog: DOMStubStory = domStub(() => {
  const dialog = new WaitingDialog('通知中......');
  return dialog.getRootHTMLElement();
});