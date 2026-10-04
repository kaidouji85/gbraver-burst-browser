import { getCurrentNPCStage } from "../../../arcade-mode/get-current-npc-stage";
import { getNPCStageLevel } from "../../../arcade-mode/get-npc-stage-level";
import { NPCBattleState } from "../../../arcade-mode/npc-battle-state";
import { DefaultStage } from "../../../arcade-mode/stages/default-stage";
import { GameProps } from "../../../game-props";
import { NPCBattle, PlayingNPCBattle } from "../../../in-progress/npc-battle";
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
  await startNPCBattleStage(props, player, stage, level);
}
