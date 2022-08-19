// @flow
import {createBGMManager} from '../src/js/bgm/bgm-manager';
import {Title} from "../src/js/game/dom-scenes/title/title";
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";

export default {
  title: 'title'
};

export const guestAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'GuestAccount'};
  const bgm = createBGMManager();
  const scene = new Title({resources, bgm, account, isApiServerEnable: true, termsOfServiceURL: 'terms-of-service',
    privacyPolicyURL: 'privacy-policy', contactURL: 'contact'});
  return scene.getRootHTMLElement();
});

export const loggedInAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'LoggedInAccount', name: 'test-account', pictureURL: 'test-picture'};
  const bgm = createBGMManager();
  const scene = new Title({resources, bgm, account, isApiServerEnable: true, termsOfServiceURL: 'terms-of-service',
    privacyPolicyURL: 'privacy-policy', contactURL: 'contact'});
  return scene.getRootHTMLElement();
});
