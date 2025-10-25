import {
  BatteryCommandSelectedEventProps,
  CommandCanceled,
} from "../../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../../props";
import { SurviveSuperPowerWithGuardState } from "../../state";
import { useBattleSimulator } from "../../stories/use-battle-simulator";
import { shouldPlayUseBattleSimulator } from "./should-play-use-battle-simulator";

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @returns コマンドキャンセル情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<
    BatteryCommandSelectedEventProps & SurviveSuperPowerWithGuardProps
  >,
): Promise<{
  commandCanceled: CommandCanceled;
  state: SurviveSuperPowerWithGuardState;
}> {
  let isCommandCanceled = false;
  let { state } = props;
  if (shouldPlayUseBattleSimulator(props)) {
    await useBattleSimulator(props);
    isCommandCanceled = true;
    state = { ...state, isUseBattleSimulatorComplete: true };
  }
  return { commandCanceled: { isCommandCanceled }, state };
}
