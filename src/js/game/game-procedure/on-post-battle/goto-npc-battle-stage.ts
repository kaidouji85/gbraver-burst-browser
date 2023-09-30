import { PostBattleAction } from "../../game-actions/post-battle-action";
import { GameProps } from "../../game-props";
import {
  getCurrentNPCStage,
  getNPCStageLevel,
  NPCBattleState,
} from "../../npc-battle";
import { DefaultStage } from "../../npc-battle-courses";
import { startNPCBattleStage } from "../start-npc-battle-stage";

/**
 * 条件を満たした場合、NPCバトルステージに遷移する
 * @param props ゲームプロパティ
 * @param action 戦闘終了後アクション
 * @return 遷移した場合はtrue
 */
export async function gotoNPCBattleStageIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<PostBattleAction>,
): Promise<boolean> {
  if (
    !(
      props.inProgress.type === "NPCBattle" &&
      props.inProgress.npcBattle.type === "PlayingNPCBattle"
    ) ||
    !(action.action.type === "NextStage" || action.action.type === "Retry")
  ) {
    return false;
  }

  const state: NPCBattleState = props.inProgress.npcBattle.state;
  const stage = getCurrentNPCStage(state) ?? DefaultStage;
  const level = getNPCStageLevel(state);
  const player = state.player;
  props.domFloaters.hiddenPostBattle();
  await startNPCBattleStage(props, player, stage, level);
  return true;
}
