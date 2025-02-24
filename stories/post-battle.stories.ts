import { StoryFn } from "@storybook/html";

import { PostBattleFloater } from "../src/js/dom-floaters/post-battle";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
} from "../src/js/game/post-battle-buttons";
import { waitTime } from "../src/js/wait/wait-time";
import { domStub } from "./stub/dom-stub";

export default {
  title: "post-battle",
};

/** NPCバトル勝利 */
export const postNPCBattleWin: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleWinButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

/** NPCバトル敗北 */
export const postNPCBattleLose: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleLoseButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

/** NPCバトル完全クリア */
export const postNPCBattleComplete: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNPCBattleComplete });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

/** ネット対戦終了 */
export const postNetworkBattle: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  floater.show({ ...params, buttons: PostNetworkBattleButtons });
  floater.selectionCompleteNotifier().subscribe((postBattle) => {
    console.log(postBattle);
  });
  return floater.getRootHTMLElement();
});

/** 表示、非表示の繰り返し */
export const showHidden: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  (async () => {
    await floater.show({ ...params, buttons: PostNPCBattleWinButtons });
    await waitTime(3000);
    floater.hidden();
  })();

  return floater.getRootHTMLElement();
});
