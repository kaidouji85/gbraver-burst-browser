// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PostNPCBattleWinFloater} from "../src/js/game/dom-floaters/post-npc-battle-win/post-npc-battle-win";
import {waitTime} from "../src/js/wait/wait-time";

export default {
  title: 'post-npc-battle-win'
};

export const floater: DOMStubStory = domStub(() => {
  const floater = new PostNPCBattleWinFloater();
  floater.show();
  return floater.getRootHTMLElement();
});

export const showHidden: DOMStubStory = domStub(() => {
  const floater = new PostNPCBattleWinFloater();
  (async () => {
    await floater.show();
    await waitTime(3000);
    floater.hidden();
  })();
  return floater.getRootHTMLElement();
});