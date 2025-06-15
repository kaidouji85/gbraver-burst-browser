import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * FirstTurnLoseを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayFirstTurnLose = (
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) => {
  const { mainTurnCount, enemy } = props;
  const isEnemyWin = props.stateHistory.some(
    (s) =>
      s.effect.name === "GameEnd" &&
      s.effect.result.type === "GameOver" &&
      s.effect.result.winner === enemy.playerId,
  );
  return mainTurnCount === 1 && isEnemyWin;
};
