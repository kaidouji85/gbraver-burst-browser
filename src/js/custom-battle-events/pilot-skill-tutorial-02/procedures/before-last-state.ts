import { totalCorrectPower } from "gbraver-burst-core";

import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial02Props } from "../props";
import { PilotSkillTutorial02State } from "../state";
import { doPilotSkill } from "../stories/do-pilot-skill";
import { introduction } from "../stories/introduction";
import { shouldAttack3OrMore } from "../stories/should-attack3-or-more";

/**
 * 条件を満たせば「パイロットスキル発動を推奨」を再生する
 * @param props イベントプロパティ
 * @return ストーリーを再生したか否か、trueで再生した
 */
async function executeDoPilotSkillIfNeeded(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const lastState = props.update[props.update.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (correctPower <= 0 && turn === 2 && !props.state.isDoPilotSkillComplete) {
    await doPilotSkill(props);
    return true;
  }

  return false;
}

/**
 * 条件を満たせば「3以上で攻撃する」を再生する
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return ストーリーを再生したか否か、trueで再生した
 */
async function executeShouldAttack3OrMoreIfNeeded(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<boolean> {
  const lastState = props.update[props.update.length - 1];
  if (!lastState) {
    return false;
  }

  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (!player) {
    return false;
  }

  const correctPower = totalCorrectPower(player.armdozer.effects);
  const turn = turnCount(props.stateHistory);
  if (
    0 < correctPower &&
    turn === 2 &&
    !props.state.isShouldAttack5OrMoreComplete
  ) {
    await shouldAttack3OrMore(props);
    return true;
  }

  return false;
}

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @return ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & PilotSkillTutorial02Props>,
): Promise<PilotSkillTutorial02State> {
  const turn = turnCount(props.stateHistory);
  if (turn === 1 && !props.state.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...props.state, isIntroductionComplete: true };
  }

  const isDoPilotSkillExecuted = await executeDoPilotSkillIfNeeded(props);
  if (isDoPilotSkillExecuted) {
    return { ...props.state, isDoPilotSkillComplete: true };
  }

  const isShouldAttack5OrMoreExecuted =
    await executeShouldAttack3OrMoreIfNeeded(props);
  if (isShouldAttack5OrMoreExecuted) {
    return { ...props.state, isShouldAttack5OrMoreComplete: true };
  }

  return props.state;
}