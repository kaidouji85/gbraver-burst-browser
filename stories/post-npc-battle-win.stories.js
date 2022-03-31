// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PostNPCBattleWinFloater} from "../src/js/game/dom-floater/post-npc-battle-win/post-npc-battle-win";

export default {
  title: 'post-npc-battle-win'
};

export const floater: DOMStubStory = domStub(() => {
  const floater = new PostNPCBattleWinFloater();
  return floater.getRootHTMLElement();
});