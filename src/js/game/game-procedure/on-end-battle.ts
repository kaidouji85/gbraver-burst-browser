import type { GameEndResult, GameOver } from "gbraver-burst-core";

import {
  BattleAnimationTimeScales,
  parseBattleAnimationTimeScale,
} from "../config/browser-config";
import type { PostBattleButtonConfig } from "../dom-floaters/post-battle/post-battle-button-config";
import {
  PostNetworkBattleButtons,
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
  PostTutorialLoseButtons,
  PostTutorialWinButtons,
} from "../dom-floaters/post-battle/post-battle-buttons";
import type { EndBattle } from "../game-actions";
import type { GameProps } from "../game-props";
import type { InProgress } from "../in-progress/in-progress";
import type { NPCBattle, PlayingNPCBattle } from "../in-progress/npc-battle";
import type { PlayingTutorialStage } from "../in-progress/tutorial";
import type { NPCBattleResult } from "../npc-battle";
import { updateNPCBattleState } from "../npc-battle";

/**
 * 戦闘画面のアニメーションタイムスケールを設定に反映する
 *
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
 *
 * @param result NPCバトル結果
 * @return 表示するアクションボタン
 */
const postNPCBattleButtons = (result: NPCBattleResult) => {
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
 * チュートリアル進行中に利用するデータを生成する
 *
 * @param inProgress 進行中のフロー
 * @param gameEndResult 戦闘結果
 * @return 生成結果、チュートリアル中でない場合はnullを返す
 */
const createTutorial = (
  inProgress: InProgress,
  gameEndResult: GameEndResult
) => {
  if (
    inProgress.type === "Tutorial" &&
    inProgress.subFlow.type === "PlayingTutorialStage" &&
    gameEndResult.type === "GameOver"
  ) {
    const gameOver = gameEndResult as GameOver;
    const playingTutorialStage = inProgress.subFlow as PlayingTutorialStage;
    const isPlayerWin =
      gameOver.winner === playingTutorialStage.stage.player.playerId;
    const postBattleButtons = isPlayerWin
      ? PostTutorialWinButtons
      : PostTutorialLoseButtons;
    return {
      postBattleButtons,
    };
  }

  return null;
};

/**
 * チュートリアルが終了した際の処理
 *
 * @param props ゲームプロパティ
 * @param postBattleButtons 戦闘終了後アクションボタン設定
 * @return 処理が完了したら発火するPromise
 */
const endTutorial = async (
  props: Readonly<GameProps>,
  postBattleButtons: PostBattleButtonConfig[]
) => {
  await props.domFloaters.showPostBattle(props.resources, postBattleButtons);
};

/**
 * 戦闘終了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onEndBattle(
  props: GameProps,
  action: EndBattle
): Promise<void> {
  const tutorial = createTutorial(props.inProgress, action.gameEnd.result);
  await saveAnimationTimeScale(props, action.animationTimeScale);

  if (props.inProgress.type === "NPCBattle" && props.inProgress.subFlow.type === "PlayingNPCBattle") {
    const updated = updateNPCBattleState(props.inProgress.subFlow.state, action.gameEnd.result);
    if (updated) {
      props.inProgress = {
        ...props.inProgress,
        subFlow: { 
          ...props.inProgress.subFlow, 
          state: updated.state
        }
      };
      await props.domFloaters.showPostBattle(props.resources, postNPCBattleButtons(updated.result));
    }
  } else if (props.inProgress.type === "CasualMatch") {
    props.suddenlyBattleEnd.unbind();
    await props.api.disconnectWebsocket();
    await props.domFloaters.showPostBattle(
      props.resources,
      PostNetworkBattleButtons
    );
  } else if (tutorial) {
    //await endTutorial(props, tutorial.postBattleButtons);
  }
}
