import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial02State } from "../state";
import { introduction } from "../stories/introduction";

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
  if (turn === 1 && !state.isIntroductionComplete) {
    await introduction(props);
    invisibleAllMessageWindows(props);
    return { ...state, isIntroductionComplete: true };
  }
  return state;
}