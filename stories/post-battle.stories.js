// @flow
import type {DOMStubStory} from "./stub/dom-stub";
import {domStub} from "./stub/dom-stub";
import {PostBattleFloater} from "../src/js/game/dom-floaters/post-battle/post-battle";
import {waitTime} from "../src/js/wait/wait-time";
import {
  PostNetworkBattleButtons,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons
} from "../src/js/game/dom-floaters/post-battle/post-battle-buttons";

export default {
  title: 'post-battle'
};

export const postNPCBattleWin: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  floater.show(PostNPCBattleWinButtons);
  floater.selectionCompleteNotifier().subscribe(postBattle => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNPCBattleLose: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  floater.show(PostNPCBattleLoseButtons);
  floater.selectionCompleteNotifier().subscribe(postBattle => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNeteorkBattle: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  floater.show(PostNetworkBattleButtons);
  floater.selectionCompleteNotifier().subscribe(postBattle => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const showHidden: DOMStubStory = domStub(() => {
  const floater = new PostBattleFloater();
  (async () => {
    await floater.show(PostNPCBattleWinButtons);
    await waitTime(3000);
    floater.hidden();
  })();
  return floater.getRootHTMLElement();
});