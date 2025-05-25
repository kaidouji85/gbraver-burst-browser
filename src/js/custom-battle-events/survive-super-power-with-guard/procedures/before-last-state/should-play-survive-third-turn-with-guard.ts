import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * SurviveThirdTurnWithGuardを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlaySurviveThirdTurnWithGuard = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { isIntroductionComplete } = props.state;
  const { turn, enemy } = props.lastStateCondition;
  const hasNotGameEnd = !props.stateHistory.some(
    (s) => s.effect.name === "GameEnd",
  );
  const isEnemyAttackGuard = props.update.some(
    (s) =>
      s.effect.name === "Battle" &&
      s.effect.result.name === "Guard" &&
      s.effect.attacker === enemy.playerId,
  );
  return (
    !isIntroductionComplete && turn === 3 && hasNotGameEnd && isEnemyAttackGuard
  );
};
