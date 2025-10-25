import {
  BatteryCommandSelectedEventProps,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";
import { useBattleSimulator } from "../stories/use-battle-simulator";

/**
 * 「useBattleSimulator」を再生するか否か
 * @param props イベントプロパティ
 * @returns 判定結果、trueで再生
 */
function shouldPlayUseBattleSimulator(
  props: Readonly<
    BatteryCommandSelectedEventProps & SurviveSuperPowerWithGuardProps
  >,
): boolean {
  const { mainTurnCount } = props;
  return mainTurnCount === 4;
}

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
  const { state } = props;
  if (shouldPlayUseBattleSimulator(props)) {
    await useBattleSimulator(props);
    isCommandCanceled = true;
  }
  return { commandCanceled: { isCommandCanceled }, state };
}
