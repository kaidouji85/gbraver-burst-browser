import { PostBattleFloater } from "../src/js/dom-floaters/post-battle";
import { PostBattleButtonConfig } from "../src/js/dom-floaters/post-battle/post-battle-button-config";
import {
  PostEpisodeButtons,
  PostEpisodeLoseButtons,
  PostEpisodeWinButtons,
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
    const floater = new PostBattleFloater(params);
    floater.show({ ...params, buttons });
    floater.selectionCompleteNotifier().subscribe((postBattle) => {
      console.log(postBattle);
    });
    return floater.getRootHTMLElement();
  });

/** NPCバトル勝利 */
export const postNPCBattleWin = postBattleStory(PostNPCBattleWinButtons);

/** NPCバトル敗北 PostNPCBattleLoseButtons */
export const postNPCBattleLose = postBattleStory(PostNPCBattleLoseButtons);

/** NPCバトル完全クリア  */
export const postNPCBattleComplete = postBattleStory(PostNPCBattleComplete);

/** ネット対戦終了 */
export const postNetworkBattle = postBattleStory(PostNetworkBattleButtons);

/** エピソード終了 */
export const postEpisode = postBattleStory(PostEpisodeButtons);

/** エピソード終了（プレイヤーの勝利） */
export const postEpisodeWin = postBattleStory(PostEpisodeWinButtons);

/** エピソード終了（プレイヤーの敗北） */
export const postEpisodeLose = postBattleStory(PostEpisodeLoseButtons);

/** 表示、非表示の繰り返し */
export const showHidden = domStub((params) => {
  const floater = new PostBattleFloater(params);
  (async () => {
    await floater.show({ ...params, buttons: PostNPCBattleWinButtons });
    await waitTime(3000);
    floater.hide();
  })();

  return floater.getRootHTMLElement();
});
