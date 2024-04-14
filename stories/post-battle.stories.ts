import { PostBattleFloater } from "../src/js/game/dom-floaters/post-battle/post-battle";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
} from "../src/js/game/dom-floaters/post-battle/post-battle-buttons";
import { waitTime } from "../src/js/wait/wait-time";
import type { DOMStubStory } from "./stub/dom-stub";
import { domStub } from "./stub/dom-stub";

export default {
  title: "post-battle",
};

export const postNPCBattleWin: DOMStubStory = domStub((resources, se) => {
  const floater = new PostBattleFloater();
  floater.show({ resources, se, buttons: PostNPCBattleWinButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNPCBattleLose: DOMStubStory = domStub((resources, se) => {
  const floater = new PostBattleFloater();
  floater.show({ resources, se, buttons: PostNPCBattleLoseButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNPCBattleComplete: DOMStubStory = domStub((resources, se) => {
  const floater = new PostBattleFloater();
  floater.show({ resources, se, buttons: PostNPCBattleComplete });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNetworkBattle: DOMStubStory = domStub((resources, se) => {
  const floater = new PostBattleFloater();
  floater.show({ resources, se, buttons: PostNetworkBattleButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const showHidden: DOMStubStory = domStub((resources, se) => {
  const floater = new PostBattleFloater();

  (async () => {
    await floater.show({ resources, se, buttons: PostNPCBattleWinButtons });
    await waitTime(3000);
    floater.hidden();
  })();

  return floater.getRootHTMLElement();
});
