// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {LoginDialog} from '../src/js/game/dom-dialogs/login/login-dialog'

export default {
  title: 'login-dialog',
};

export const dialog: DOMStubStory = domStub(resources => {  
  const dialog = new LoginDialog(resources, 'ネット対戦をするにはログインしてください');
  dialog.loginNotifier().subscribe(() => {
    console.log('login');
  });
  dialog.closeDialogNotifier().subscribe(() => {
    console.log('close');
  });
  return dialog.getRootHTMLElement();
});