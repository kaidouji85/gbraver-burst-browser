import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * SurviveSecondTurnWithEvadeを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlaySurviveSecondTurnWithEvade = (
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) => {
  const { isThirdTurnEventComplete } = props.state;
  const { mainTurnCount, enemy } = props;
  const lastBattle = props.stateHistory
    .map((s) => s.effect)
    .filter((e) => e.name === "Battle")
    .at(-1);
  const isEnemyAttackMiss =
    lastBattle?.result.name === "Miss" &&
    lastBattle.attacker === enemy.playerId;
  return !isThirdTurnEventComplete && mainTurnCount === 2 && isEnemyAttackMiss;
};
