import { LastStateEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * playerLoseを再生するかどうかの判定
 * @param props イベントプロパティ
 * @returns 再生する場合はtrue
 */
export const shouldPlayPlayerLose = (
  props: Readonly<LastStateEventProps & SurviveSuperPowerWithGuardProps>,
) => {
  const { enemy } = props;
  return props.stateHistory.some(
    (s) =>
      s.effect.name === "GameEnd" &&
      s.effect.result.type === "GameOver" &&
      s.effect.result.winner === enemy.playerId,
  );
};
