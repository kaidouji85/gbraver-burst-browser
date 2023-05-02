import { GameOver } from "gbraver-burst-core";

import { PostBattleButtonConfig } from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../game-actions/end-battle";
import type { GameProps } from "../game-props";
import { PlayingTutorialStage } from "../in-progress/tutorial";
import type { NPCBattleResult } from "../npc-battle";
import { updateNPCBattleState } from "../npc-battle";
import { parseBattleAnimationTimeScale } from "../config/parser/battle-animation-time-scale";
import { BattleAnimationTimeScales } from "../config/browser-config";

/**
 * 戦闘画面のアニメーションタイムスケールを設定に反映する
 * @param props ゲームプロパティ
 * @param animationTimeScale 反映するタイムスケール
 */
const saveAnimationTimeScale = async (
  props: Readonly<GameProps>,
  animationTimeScale: number
) => {
  const battleAnimationTimeScale =
    parseBattleAnimationTimeScale(animationTimeScale) ??
    BattleAnimationTimeScales[0];
  const origin = await props.config.load();
  const update = { ...origin, battleAnimationTimeScale };
  await props.config.save(update);
};

/**
 * NPCバトル終了後に表示するアクションボタンを求める
 * @param result NPCバトル結果
 * @return 表示するアクションボタン
 */
const postNPCBattleButtons = (
  result: NPCBattleResult
): PostBattleButtonConfig[] => {
  switch (result) {
    case "NPCBattleComplete":
      return PostNPCBattleComplete;
    case "StageClear":
      return PostNPCBattleWinButtons;
    case "StageMiss":
    default:
      return PostNPCBattleLoseButtons;
  }
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
  if (
    props.inProgress.type === "NPCBattle" &&
    props.inProgress.subFlow.type === "PlayingNPCBattle"
  ) {
    const updated = updateNPCBattleState(
      props.inProgress.subFlow.state,
      action.gameEnd.result
    );
    if (updated) {
      props.inProgress.subFlow.state = updated.state;
      await props.domFloaters.showPostBattle(
        props.resources,
        postNPCBattleButtons(updated.result)
      );
    }
  } else if (
    props.inProgress.type === "CasualMatch" ||
    props.inProgress.type === "PrivateMatchHost" ||
    props.inProgress.type === "PrivateMatchGuest"
  ) {
    props.suddenlyBattleEnd.unbind();
    await props.api.disconnectWebsocket();
    await props.domFloaters.showPostBattle(
      props.resources,
      PostNetworkBattleButtons
    );
  } else if (
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
