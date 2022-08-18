// @flow
import type {DifficultySelectionComplete} from "../game-actions";
import type {GameProps} from "../game-props";
import type {DifficultySelect, NPCBattle} from "../in-progress/npc-battle";
import {createNPCBattlePlayer, getCurrentStage, getStageLevel, createNPCBattleState} from "../npc-battle";
import {DefaultStage, DefaultStages, NPCBattleCourses} from "../npc-battle-courses";
import {startNPCBattleStage} from "./start-npc-battle-stage";

/**
 * 難易度選択完了時のイベント
 * 本関数はpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onDifficultySelectionComplete(props: GameProps, action: DifficultySelectionComplete): Promise<void> {
  if (!(props.inProgress.type === 'NPCBattle' && props.inProgress.subFlow.type === 'DifficultySelect')) {
    return;
  }

  const npcBattle: NPCBattle = props.inProgress;
  const difficultySelect: DifficultySelect = props.inProgress.subFlow;
  const {armdozerId, pilotId} = difficultySelect;
  const player = createNPCBattlePlayer(armdozerId, pilotId);
  const stages = NPCBattleCourses
    .find(v => v.armdozerId === armdozerId && v.difficulty === action.difficulty)?.stages ?? DefaultStages;
  const npcBattleState = createNPCBattleState(player, stages);
  props.inProgress = {...npcBattle, subFlow: {type: 'PlayingNPCBattle', state: npcBattleState}};
  const stage = getCurrentStage(npcBattleState) ?? DefaultStage;
  const level = getStageLevel(npcBattleState);
  await startNPCBattleStage(props, player, stage, level);
}