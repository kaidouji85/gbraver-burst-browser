// @flow

import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {Title} from "../src/js/game/dom-scenes/title/title";
import {createNowPlayingBGM} from '../src/js/game/bgm/now-playing-bgm';

export default {
  title: 'title'
};

export const guestAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'GuestAccount'};
  const nowPlayingBGM = createNowPlayingBGM();
  const scene = new Title(resources, nowPlayingBGM, account, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});

export const loggedInAccount: DOMStubStory = domStub(resources => {
  const account = {type: 'LoggedInAccount', name: 'test-account', pictureURL: 'test-picture'};
  const nowPlayingBGM = createNowPlayingBGM();
  const scene = new Title(resources, nowPlayingBGM, account, true, 'terms-of-service', 'privacy-policy', 'contact');
  return scene.getRootHTMLElement();
});
