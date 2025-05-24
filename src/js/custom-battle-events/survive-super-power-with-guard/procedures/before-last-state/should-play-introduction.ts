import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * Introductionを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayIntroduction = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { isIntroductionComplete } = props.state;
  const { turn } = props.lastStateCondition;
  return !isIntroductionComplete && turn === 1;
};
