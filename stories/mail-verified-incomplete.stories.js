// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {MailVerifiedIncomplete} from "../src/js/game/dom-scenes/mail-verified-incomplete/mail-verified-incomplete";

export default {
  title: 'mail-verified-incomplete',
};

export const scene: DOMStubStory = domStub(resources => {
  const scene = new MailVerifiedIncomplete('test@mail.address.com');
  return scene.getRootHTMLElement();
});