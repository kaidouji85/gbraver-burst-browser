import { BatteryCommandSelectedEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";

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
  const { mainTurnCount } = props;
  return mainTurnCount === 4 && !props.state.isUseBattleSimulatorComplete;
}
