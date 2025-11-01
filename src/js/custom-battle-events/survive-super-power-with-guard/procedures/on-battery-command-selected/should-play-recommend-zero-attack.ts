import { BatteryCommandSelectedEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

/**
 * 「recommendedZeroAttack」を再生するか否か
 * @param props イベントプロパティ
 * @returns 判定結果、trueで再生
 */
export function shouldPlayRecommendZeroAttack(
  props: Readonly<
    BatteryCommandSelectedEventProps & SurviveSuperPowerWithGuardProps
  >,
): boolean {
  const { mainTurnCount, isRetry, state, battery } = props;
  return (
    isRetry &&
    mainTurnCount === 1 &&
    !state.isRecommendZeroAttackComplete &&
    0 < battery.battery
  );
}
