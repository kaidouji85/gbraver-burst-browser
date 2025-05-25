import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * SurviveThirdTurnWithEvadeを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlaySurviveThirdTurnWithEvade = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { isThirdTurnEventComplete } = props.state;
  const { turn, enemy } = props.lastStateCondition;
  const lastBattle = props.stateHistory
    .map((s) => s.effect)
    .filter((e) => e.name === "Battle")
    .at(-1);
  const isEnemyAttackMiss =
    lastBattle?.result.name === "Miss" &&
    lastBattle.attacker === enemy.playerId;

  return !isThirdTurnEventComplete && turn === 3 && isEnemyAttackMiss;
};
