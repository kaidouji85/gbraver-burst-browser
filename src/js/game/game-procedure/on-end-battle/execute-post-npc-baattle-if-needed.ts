import { PostBattleButtonConfig } from "../../dom-floaters/post-battle/post-battle-button-config";
import {
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
} from "../../dom-floaters/post-battle/post-battle-buttons";
import { EndBattle } from "../../game-actions/end-battle";
import { GameProps } from "../../game-props";
import { InProgress } from "../../in-progress/in-progress";
import { NPCBattleResult, updateNPCBattleState } from "../../npc-battle";

/**
 * NPCバトル終了後に表示するアクションボタンを求める
 * @param result NPCバトル結果
 * @return 表示するアクションボタン
 */
const postNPCBattleButtons = (
  result: NPCBattleResult,
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
  /** inProgress更新結果 */
  inProgress: InProgress;
};

/** NPCバトル終了後処理が実行されなかった時の情報 */
type IsNotExecuted = {
  isExecuted: false;
};

/** NPCバトル終了処理の実行情報 */
type Ret = IsExecuted | IsNotExecuted;

/**
 * 条件を満たした場合、NPCバトル終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return NPCバトル終了処理の実行情報
 */
export async function executePostNPCBattleIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
): Promise<Ret> {
  if (
    props.inProgress.type !== "NPCBattle" ||
    props.inProgress.npcBattle.type !== "PlayingNPCBattle"
  ) {
    return { isExecuted: false };
  }

  const updated = updateNPCBattleState(
    props.inProgress.npcBattle.state,
    action.gameEnd.result,
  );
  if (!updated) {
    return { isExecuted: false };
  }

  await props.domFloaters.showPostBattle({
    ...props,
    buttons: postNPCBattleButtons(updated.result),
  });
  return {
    isExecuted: true,
    inProgress: {
      ...props.inProgress,
      npcBattle: {
        ...props.inProgress.npcBattle,
        state: updated.state,
      },
    },
  };
}
