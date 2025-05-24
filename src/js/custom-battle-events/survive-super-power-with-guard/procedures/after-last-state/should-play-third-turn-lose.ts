import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * ThirdTurnLoseを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayThirdTurnLose = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { turn } = props.lastStateCondition;
  return turn === 3;
};
