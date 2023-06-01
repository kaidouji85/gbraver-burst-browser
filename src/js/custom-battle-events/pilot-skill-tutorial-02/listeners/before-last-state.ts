import { totalCorrectPower } from "gbraver-burst-core";
import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial02State } from "../state";
import { doPilotSkill } from "../stories/do-pilot-skill";
import { introduction } from "../stories/introduction";
import { shouldAttack5OrMore } from "../stories/should-attack5-or-more";

/**
 * 条件を満たせば「パイロットスキル発動を推奨」を再生する
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return ストーリーを再生したか否か、trueで再生した
 */
async function doPilotSkillOrNothing(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial02State>,
): Promise<boolean> {
  const lastState = props.update[props.update.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find(v => v.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (
    correctPower <= 0 && 
    turn === 2 &&
    !state.isDoPilotSkillComplete
  ) {
    await doPilotSkill(props);
    return true;
  }

  return false;
}

/**
 * 条件を満たせば「5以上で攻撃する」を再生する
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return ストーリーを再生したか否か、trueで再生した
 */
async function doAttack3OrMoreOrNothing(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial02State>,
): Promise<boolean> {
  const lastState = props.update[props.update.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find(v => v.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (
    0 < correctPower && 
    turn === 2 &&
    !state.isShouldAttack5OrMoreComplete
  ) {
    await shouldAttack5OrMore(props);
    return true;
  }

  return false;
}

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @param state ステート
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState>,
  state: Readonly<PilotSkillTutorial02State>
): Promise<PilotSkillTutorial02State> {
  const turn = turnCount(props.stateHistory);
  if (
    turn === 1 && 
    !state.isIntroductionComplete
  ) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...state, isIntroductionComplete: true };
  }

  const isDoPilotSkillPlayed = await doPilotSkillOrNothing(props, state);
  if (isDoPilotSkillPlayed) {
    return { ...state, isDoPilotSkillComplete: true };
  }

  const isShouldAttack5OrMorePlayed = await doAttack3OrMoreOrNothing(props, state);
  if (isShouldAttack5OrMorePlayed) {
    return { ...state, isShouldAttack5OrMoreComplete: true };
  }

  return state;
}