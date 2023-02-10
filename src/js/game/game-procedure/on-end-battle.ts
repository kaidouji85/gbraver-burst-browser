import {
  BattleAnimationTimeScales,
  parseBattleAnimationTimeScale,
} from "../config/browser-config";
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
  } else if (
    props.inProgress.type === "Tutorial" 
    && props.inProgress.subFlow.type === "PlayingTutorialStage"
    && action.gameEnd.result.type === "GameOver"
  ) {
    const isPlayerWin =
      action.gameEnd.result.winner === props.inProgress.subFlow.stage.player.playerId;
    const postBattleButtons = isPlayerWin
      ? PostTutorialWinButtons
      : PostTutorialLoseButtons;
    await props.domFloaters.showPostBattle(props.resources, postBattleButtons);
  }
}
