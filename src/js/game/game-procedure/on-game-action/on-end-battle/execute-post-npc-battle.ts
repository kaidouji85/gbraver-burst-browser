import { PostBattleButtonConfig } from "../../../../dom-floaters/post-battle/post-battle-button-config";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { NPCBattle } from "../../../in-progress/npc-battle";
import {
  getNPCBattleResult,
  NPCBattleResult,
} from "../../../npc-battle/npc-battle-result";
import { updateNPCBattleState } from "../../../npc-battle/updated-npc-battle-state";
import {
  PostNPCBattleComplete,
  PostNPCBattleLoseButtons,
  PostNPCBattleWinButtons,
} from "../../../post-battle-buttons";

/**
 * NPCバトル終了後に表示するアクションボタンを求める
 * @param result NPCバトル結果
 * @returns 表示するアクションボタン
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

/**
 * NPCバトル終了後処理を実行する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export async function executePostNPCBattle(
  props: Readonly<GameProps & { inProgress: NPCBattle }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress, postBattle } = props;
  const { gameEnd } = action;
  if (inProgress.npcBattle.type !== "PlayingNPCBattle") {
    return inProgress;
  }

  const { npcBattle } = inProgress;
  const npcBattleResult = getNPCBattleResult(npcBattle.state, gameEnd.result);
  const updatedState = updateNPCBattleState(npcBattle.state, npcBattleResult);
  const buttons = postNPCBattleButtons(npcBattleResult);
  await postBattle.show({ ...props, buttons });
  return {
    ...inProgress,
    npcBattle: { ...inProgress.npcBattle, state: updatedState },
  };
}
