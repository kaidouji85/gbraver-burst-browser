// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {LoginDialog} from '../src/js/game/dom-dialogs/login/login-dialog'

export default {
  title: 'login',
};

export const dialog: DOMStubStory = domStub(() => {
  const dialog = new LoginDialog();
  return dialog.getRootHTMLElement();
});