import { GameOver } from "gbraver-burst-core";

import { PostBattleButtonConfig } from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../game-actions/end-battle";
import { GameProps } from "../game-props";
import { PlayingTutorialStage } from "../in-progress/tutorial";

/**
 * チュートリアル終了後に表示するアクションボタンを求める
 * @param gameOver ゲームオーバー情報
 * @param tutorial チュートリアルステージプレイ情報
 * @return 表示するアクションボタン
 */
const postTutorialBattleButtons = (
  gameOver: Readonly<GameOver>,
  tutorial: Readonly<PlayingTutorialStage>
): PostBattleButtonConfig[] => {
  const isPlayerWin = gameOver.winner == tutorial.stage.player.playerId;
  return isPlayerWin ? PostTutorialWinButtons : PostTutorialLoseButtons;
};

/**
 * 条件を満たした場合、チュートリアル終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return チュートリアル終了後処理を実行したか否か、trueで実行した
 */
export async function executePostTutorialBattleIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>
): Promise<boolean> {
  if (
    props.inProgress.type !== "Tutorial" ||
    props.inProgress.tutorial.type !== "PlayingTutorialStage" ||
    action.gameEnd.result.type !== "GameOver"
  ) {
    return false;
  }

  await props.domFloaters.showPostBattle(
    props.resources,
    postTutorialBattleButtons(action.gameEnd.result, props.inProgress.tutorial)
  );
  return true;
}
