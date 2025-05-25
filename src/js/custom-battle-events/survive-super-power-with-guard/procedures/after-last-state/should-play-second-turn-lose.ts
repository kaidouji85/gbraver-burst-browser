import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { LastStateConditionContainer } from "../../last-state-condition";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * SecondTurnLoseを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlaySecondTurnLose = (
  props: Readonly<
    LastStateEventProps &
      SurviveSuperPowerWithGuardProps &
      LastStateConditionContainer
  >,
) => {
  const { turn, enemy } = props.lastStateCondition;
  const isEnemyWin = props.stateHistory.some(
    (s) =>
      s.effect.name === "GameEnd" &&
      s.effect.result.type === "GameOver" &&
      s.effect.result.winner === enemy.playerId,
  );
  return turn === 2 && isEnemyWin;
};
