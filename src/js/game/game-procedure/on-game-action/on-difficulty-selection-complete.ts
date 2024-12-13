import { playerUuid } from "../../../uuid/player";
import { DifficultySelectionComplete } from "../../game-actions/difficulty-selection-complete";
import { GameProps } from "../../game-props";
import { DifficultySelect, NPCBattle } from "../../in-progress/npc-battle";
import { DefaultStages, NPCBattleCourses } from "../../npc-battle/courses";
import { createNPCBattleState } from "../../npc-battle/create-npc-battle-state";
import { getCurrentNPCStage } from "../../npc-battle/get-current-npc-stage";
import { getNPCStageLevel } from "../../npc-battle/get-npc-stage-level";
import { DefaultStage } from "../../npc-battle/stages/default-stage";
import { startNPCBattleStage } from "../start-npc-battle-stage";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: DifficultySelectionComplete;
};

/**
 * 難易度選択完了時のイベント
 * 本関数はpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export async function onDifficultySelectionComplete(
  options: Options,
): Promise<void> {
  const { props, action } = options;
  if (
    !(
      props.inProgress.type === "NPCBattle" &&
      props.inProgress.npcBattle.type === "DifficultySelect"
    )
  ) {
    return;
  }

  const npcBattle: NPCBattle = props.inProgress;
  const difficultySelect: DifficultySelect = props.inProgress.npcBattle;
  const { armdozerId, pilotId } = difficultySelect;
  const stages =
    NPCBattleCourses.find(
      (v) => v.armdozerId === armdozerId && v.difficulty === action.difficulty,
    )?.stages ?? DefaultStages;
  const npcBattleState = createNPCBattleState(
    playerUuid(),
    armdozerId,
    pilotId,
    stages,
  );
  props.inProgress = {
    ...npcBattle,
    npcBattle: {
      type: "PlayingNPCBattle",
      state: npcBattleState,
    },
  };
  const stage = getCurrentNPCStage(npcBattleState) ?? DefaultStage;
  const level = getNPCStageLevel(npcBattleState);
  await startNPCBattleStage(props, npcBattleState.player, stage, level);
}
