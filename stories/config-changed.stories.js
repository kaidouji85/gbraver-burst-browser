// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {ConfigChangedDialog} from "../src/js/game/dom-dialogs/config-changed/config-changed-dialog";

export default {
  title: 'config-changed'
};

export const guestAccount: DOMStubStory = domStub(() => {
  const dialog = new ConfigChangedDialog
  return dialog.getRootHTMLElement();
});
