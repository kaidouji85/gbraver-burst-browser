import { GameProps } from "../../../game-props";
import { NPCBattle, PlayingNPCBattle } from "../../../in-progress/npc-battle";
import { getCurrentNPCStage } from "../../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../../npc-battle/get-npc-stage-level";
import { NPCBattleState } from "../../../npc-battle/npc-battle-state";
import { DefaultStage } from "../../../npc-battle/stages/default-stage";
import { startNPCBattleStage } from "../../start-npc-battle-stage";

/**
 * NPCバトルステージに遷移する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function gotoNPCBattleStage(
  props: Readonly<
    GameProps & { inProgress: NPCBattle & { npcBattle: PlayingNPCBattle } }
  >,
): Promise<void> {
  const state: NPCBattleState = props.inProgress.npcBattle.state;
  const stage = getCurrentNPCStage(state) ?? DefaultStage;
  const level = getNPCStageLevel(state);
  const player = state.player;
  props.domFloaters.hiddenPostBattle();
  await startNPCBattleStage(props, player, stage, level);
}
