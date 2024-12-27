import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { getCurrentNPCStage } from "../../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../../npc-battle/get-npc-stage-level";
import { NPCBattleState } from "../../../npc-battle/npc-battle-state";
import { DefaultStage } from "../../../npc-battle/stages/default-stage";
import { NextStage, Retry } from "../../../post-battle";
import { startNPCBattleStage } from "../../start-npc-battle-stage";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  postAction: Readonly<NextStage | Retry>;
};

/**
 * NPCバトルステージに遷移する
 * @param options オプション
 * @returns 遷移した場合はtrue
 */
export async function gotoNPCBattleStage(
  options: Options,
): Promise<InProgress> {
  const { props } = options;
  if (
    props.inProgress.type === "NPCBattle" &&
    props.inProgress.npcBattle.type === "PlayingNPCBattle"
  ) {
    const state: NPCBattleState = props.inProgress.npcBattle.state;
    const stage = getCurrentNPCStage(state) ?? DefaultStage;
    const level = getNPCStageLevel(state);
    const player = state.player;
    props.domFloaters.hiddenPostBattle();
    await startNPCBattleStage(props, player, stage, level);
  }

  return props.inProgress;
}
