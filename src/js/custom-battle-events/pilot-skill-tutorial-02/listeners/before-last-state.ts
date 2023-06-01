import { totalCorrectPower } from "gbraver-burst-core";
import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial02State } from "../state";
import { doPilotSkill } from "../stories/do-pilot-skill";
import { introduction } from "../stories/introduction";

/**
 * 条件を満たせば、パイロットスキル発動催促ストーリーを再生する
 * @param props イベントプロパティ
 * @return ストーリーを再生したか否か、trueで再生した
 */
async function doPilotSkillOrNothing(
  props: Readonly<LastState>,
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
  if (0 < correctPower && turn === 2) {
    await doPilotSkill(props);
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

  const isDoPilotSkillPlayed = await doPilotSkillOrNothing(props);
  if (isDoPilotSkillPlayed) {
    return { ...state, isDoPilotSkillComplete: true };
  }

  return state;
}