import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenInputCommand } from "../../invisible-shout-message-window";
import { LastStateConditionContainer } from "../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";
import { introduction } from "../stories/introduction";

/**
 * Introductionを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
const shouldPlayIntroduction = (
  props: Readonly<
    LastState & SurviveSuperPowerWithGuardProps & LastStateConditionContainer
  >,
) => {
  const { isIntroductionComplete } = props.state;
  const { turn } = props.lastStateCondition;
  return !isIntroductionComplete && turn === 1;
};

/**
 * 最終ステート直前イベント
 * @param props イベントプロパティ
 * @returns ステート更新結果
 */
export async function beforeLastState(
  props: Readonly<
    LastState & SurviveSuperPowerWithGuardProps & LastStateConditionContainer
  >,
): Promise<SurviveSuperPowerWithGuardState> {
  invisibleShoutMessageWindowWhenInputCommand(props);

  let updatedState = props.state;
  if (shouldPlayIntroduction(props)) {
    await introduction(props);
    updatedState = { ...updatedState, isIntroductionComplete: true };
  }

  return updatedState;
}
