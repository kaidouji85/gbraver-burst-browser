// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {ConfigChangedDialog} from "../src/js/game/dom-dialogs/config-changed/config-changed-dialog";

export default {
  title: 'config-changed'
};

export const guestAccount: DOMStubStory = domStub(resources => {
  const dialog = new ConfigChangedDialog(resources);
  dialog.closeNotifier().subscribe(() => {
    console.log('on close');
  });
  dialog.discardNotifier().subscribe(() => {
    console.log('on discard');
  });
  dialog.acceptNotifer().subscribe(() => {
    console.log('on accept');
  });
  return dialog.getRootHTMLElement();
});
