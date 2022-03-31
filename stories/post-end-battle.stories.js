// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PostBattleEnd} from "../src/js/game/dom-floater/post-battle-end/post-battle-end";

export default {
  title: 'post-battle-end'
};

export const floater: DOMStubStory = domStub(() => {
  const floater = new PostBattleEnd();
  return floater.getRootHTMLElement();
});