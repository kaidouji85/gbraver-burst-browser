// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PostBattleFloater} from "../src/js/game/dom-floaters/post-battle/post-battle";
import {waitTime} from "../src/js/wait/wait-time";

export default {
  title: 'post-battle'
};

export const floater: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  floater.show();
  floater.selectionCompleteNotifier().subscribe(postBattle => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const showHidden: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  (async () => {
    await floater.show();
    await waitTime(3000);
    floater.hidden();
  })();
  return floater.getRootHTMLElement();
});