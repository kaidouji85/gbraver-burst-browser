import { StoryFn } from "@storybook/html";

import { PostBattleFloater } from "../src/js/game/dom-floaters/post-battle/post-battle";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
} from "../src/js/game/dom-floaters/post-battle/post-battle-buttons";
import { waitTime } from "../src/js/wait/wait-time";
import { domStub } from "./stub/dom-stub";

export default {
  title: "post-battle",
};

export const postNPCBattleWin: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleWinButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNPCBattleLose: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleLoseButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNPCBattleComplete: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleComplete });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const postNetworkBattle: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNetworkBattleButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

export const showHidden: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();

  (async () => {
    await floater.show({ ...params, buttons: PostNPCBattleWinButtons });
    await waitTime(3000);
    floater.hidden();
  })();

  return floater.getRootHTMLElement();
});
