// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title/title";

export default {
  title: 'title'
};

export const guestUser: DOMStubStory = domStub(resources => {
  const user = {type: 'GuestUser'};
  const scene = new Title(resources, user, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});

export const loggedInUser: DOMStubStory = domStub(resources => {
  const user = {type: 'LoggedInUser', name: 'test-user'};
  const scene = new Title(resources, user, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});
