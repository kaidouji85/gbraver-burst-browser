// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title/title";

export default {
  title: 'title'
};

export const guestAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'GuestAccount'};
  const scene = new Title(resources, account, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});

export const loggedInAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'LoggedInAccount', name: 'test-account', pictureURL: 'test-picture'};
  const scene = new Title(resources, account, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});
