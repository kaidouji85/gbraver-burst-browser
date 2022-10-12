// @flow
import {Title} from "../src/js/game/dom-scenes/title";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'title'
};

export const guestAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'GuestAccount'};
  const scene = new Title({resources, account, isApiServerEnable: true, termsOfServiceURL: 'terms-of-service',
    privacyPolicyURL: 'privacy-policy', contactURL: 'contact'});
  return scene.getRootHTMLElement();
});

export const loggedInAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'LoggedInAccount', name: 'test-account', pictureURL: 'test-picture'};
  const scene = new Title({resources, account, isApiServerEnable: true, termsOfServiceURL: 'terms-of-service',
    privacyPolicyURL: 'privacy-policy', contactURL: 'contact'});
  return scene.getRootHTMLElement();
});
