import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * 「5攻撃すれば勝利」を再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayAttack5AndWeWin = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { isAttack5AndWeWinComplete } = props.state;
  const { turn } = props.lastStateCondition;
  return !isAttack5AndWeWinComplete && turn === 2;
};
