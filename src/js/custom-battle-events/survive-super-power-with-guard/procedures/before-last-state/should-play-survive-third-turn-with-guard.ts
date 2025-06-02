import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * SurviveThirdTurnWithGuardを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlaySurviveThirdTurnWithGuard = (
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) => {
  const { isThirdTurnEventComplete } = props.state;
  const { playerMainTurnCount, enemy, enemyMainTurnCount } = props;
  const turn = playerMainTurnCount + enemyMainTurnCount;
  const lastBattle = props.stateHistory
    .map((s) => s.effect)
    .filter((e) => e.name === "Battle")
    .at(-1);
  const isEnemyAttackGuard =
    lastBattle?.result.name === "Guard" &&
    lastBattle.attacker === enemy.playerId;
  return !isThirdTurnEventComplete && turn === 3 && isEnemyAttackGuard;
};
