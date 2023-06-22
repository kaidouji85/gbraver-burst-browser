import { GameOver } from "gbraver-burst-core";

import { parseBrowserConfig } from "../config/parser/browser-config";
import { PostBattleButtonConfig } from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../game-actions/end-battle";
import type { GameProps } from "../game-props";
import { PlayingTutorialStage } from "../in-progress/tutorial";
import { executePostNPCBattleIfNeeded } from "./execute-post-npc-baattle-if-needed";
import { executePostNetBattleIfNeeded } from "./execute-post-net-battle-if-needed";

/**
 * 戦闘画面のアニメーションタイムスケールを設定に反映する
 * @param props ゲームプロパティ
 * @param animationTimeScale 反映するタイムスケール
 */
const saveAnimationTimeScale = async (
  props: Readonly<GameProps>,
  animationTimeScale: number
) => {
  const origin = await props.config.load();
  await props.config.save(
    parseBrowserConfig({
      ...origin,
      battleAnimationTimeScale: animationTimeScale,
    })
  );
};

/**
 * チュートリアル終了後に表示するアクションボタンを求める
 * @param gameOver ゲームオーバー情報
 * @param state チュートリアルステート
 * @return 表示するアクションボタン
 */
const postTutorialBattleButtons = (
  gameOver: GameOver,
  state: PlayingTutorialStage
): PostBattleButtonConfig[] => {
  const isPlayerWin = gameOver.winner == state.stage.player.playerId;
  return isPlayerWin ? PostTutorialWinButtons : PostTutorialLoseButtons;
};

/**
 * 戦闘終了時の処理
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onEndBattle(
  props: GameProps,
  action: EndBattle
): Promise<void> {
  await saveAnimationTimeScale(props, action.animationTimeScale);
  const postNPCBattle = await executePostNPCBattleIfNeeded(props, action);
  if (postNPCBattle.isExecuted) {
    props.inProgress = postNPCBattle.inProgress;
    return;
  }

  const isPostNetBattleExecuted = await executePostNetBattleIfNeeded(props);
  if (isPostNetBattleExecuted) {
    return;
  }
  
  if (
    props.inProgress.type === "Tutorial" &&
    props.inProgress.subFlow.type === "PlayingTutorialStage" &&
    action.gameEnd.result.type === "GameOver"
  ) {
    await props.domFloaters.showPostBattle(
      props.resources,
      postTutorialBattleButtons(action.gameEnd.result, props.inProgress.subFlow)
    );
  }
}
