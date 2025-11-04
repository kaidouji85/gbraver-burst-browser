import { BatteryCommandSelectedEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { willPlayerDieWithCurrentBattery } from "../will-player-die-with-current-battery";

/**
 * 「useBattleSimulator」を再生するか否か
 * @param props イベントプロパティ
 * @returns 判定結果、trueで再生
 */
export function shouldPlayUseBattleSimulator(
  props: Readonly<
    BatteryCommandSelectedEventProps & SurviveSuperPowerWithGuardProps
  >,
): boolean {
  const { mainTurnCount, isRetry } = props;
  return (
    isRetry &&
    mainTurnCount === 2 &&
    !props.state.isUseBattleSimulatorComplete &&
    willPlayerDieWithCurrentBattery(props)
  );
}
