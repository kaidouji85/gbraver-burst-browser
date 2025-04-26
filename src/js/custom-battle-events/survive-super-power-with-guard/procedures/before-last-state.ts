import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";
import { introduction } from "../stories/introduction";

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<LastState & SurviveSuperPowerWithGuardProps>,
): Promise<SurviveSuperPowerWithGuardState> {
  let updatedState = props.state;

  if (!updatedState.isIntroductionComplete) {
    await introduction(props);
    updatedState = { ...updatedState, isIntroductionComplete: true };
  }

  return updatedState;
}
