// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {MailVerifiedIncomplete} from "../src/js/game/dom-scenes/mail-verified-incomplete/mail-verified-incomplete";

export default {
  title: 'mail-verified-incomplete',
};

export const scene: DOMStubStory = domStub(() => {
  const scene = new MailVerifiedIncomplete('test@mail.address.com');
  scene.gotoTitleNotifier().subscribe(() => {
    console.log('goto title');
  });
  scene.reloadNotifier().subscribe(() => {
    console.log('reload');
  });
  return scene.getRootHTMLElement();
});
