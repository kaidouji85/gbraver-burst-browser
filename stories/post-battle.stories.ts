import { StoryFn } from "@storybook/html";

import { PostBattleFloater } from "../src/js/dom-floaters/post-battle";
import type { PostBattleButtonConfig } from "../src/js/dom-floaters/post-battle/post-battle-button-config";
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

/**
 * ポストバトルのストーリーを生成する
 * @param buttons ボタン設定
 * @returns ストーリー
 */
const postBattleStory = (buttons: PostBattleButtonConfig[]) =>
  domStub((params) => {
    const floater = new PostBattleFloater();
    floater.show({ ...params, buttons });
    floater.selectionCompleteNotifier().subscribe((postBattle) => {
      console.log(postBattle);
    });
    return floater.getRootHTMLElement();
  });

/** NPCバトル勝利 */
export const postNPCBattleWin: StoryFn = postBattleStory(
  PostNPCBattleWinButtons,
);

/** NPCバトル敗北 PostNPCBattleLoseButtons */
export const postNPCBattleLose: StoryFn = postBattleStory(
  PostNPCBattleLoseButtons,
);

/** NPCバトル完全クリア  */
export const postNPCBattleComplete: StoryFn = postBattleStory(
  PostNPCBattleComplete,
);

/** ネット対戦終了 */
export const postNetworkBattle: StoryFn = postBattleStory(
  PostNetworkBattleButtons,
);

/** 表示、非表示の繰り返し */
export const showHidden: StoryFn = domStub((params) => {
  const floater = new PostBattleFloater();
  (async () => {
    await floater.show({ ...params, buttons: PostNPCBattleWinButtons });
    await waitTime(3000);
    floater.hide();
  })();

  return floater.getRootHTMLElement();
});
