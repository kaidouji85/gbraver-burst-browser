// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {LoginDialog} from '../src/js/game/dom-dialogs/login/login-dialog'

export default {
  title: 'login',
};

const loginMock = {
  async login(userID: string, password: string): Promise<boolean> {
    return (userID !== '') && (password !== '');
  }
};

export const dialog: DOMStubStory = domStub(resources => {  
  const dialog = new LoginDialog(resources, loginMock, 'ログインしてください');
  dialog.closeDialogNotifier().subscribe(() => {
    console.log('close');
  });
  return dialog.getRootHTMLElement();
});