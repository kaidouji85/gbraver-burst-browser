import { PostBattleButtonConfig } from "../dom-floaters/post-battle/post-battle-button-config";
import { PostNPCBattleComplete, PostNPCBattleLoseButtons, PostNPCBattleWinButtons } from "../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../game-actions/end-battle";
import { GameProps } from "../game-props";
import { NPCBattleResult, NPCBattleState, updateNPCBattleState } from "../npc-battle";

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

/** NPCバトル終了後処理が実行された時の情報 */
type IsExecuted = {
  isExecuted: true;
  /** NPCバトルステート更新結果 */
  npcBattleState: NPCBattleState;
};

/** NPCバトル終了後処理が実行されなかった時の情報 */
type IsNotExecuted = {
  isExecuted: false,
};

/** NPCバトル終了処理の実行情報 */
type Ret = IsExecuted | IsNotExecuted;

/**
 * 条件を満たした場合、NPCバトル終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 実行したか否かの情報
 */
export async function executePostNPCBattleIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>
): Promise<Ret> {
  if (
    props.inProgress.type !== "NPCBattle" ||
    props.inProgress.subFlow.type !== "PlayingNPCBattle"
  ) {
    return {isExecuted: false};
  }
  
  const updated = updateNPCBattleState(
    props.inProgress.subFlow.state,
    action.gameEnd.result
  );
  if (!updated) {
    return {isExecuted: false};
  }

  await props.domFloaters.showPostBattle(
    props.resources,
    postNPCBattleButtons(updated.result)
  );
  return {
    isExecuted: true,
    npcBattleState: updated.state
  };
}