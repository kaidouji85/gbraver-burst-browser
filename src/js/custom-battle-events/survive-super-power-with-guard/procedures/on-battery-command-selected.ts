import {
  BatteryCommandSelectedEventProps,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";
import { SurviveSuperPowerWithGuardState } from "../state";

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
  const commandCanceled: CommandCanceled = { isCommandCanceled: false };
  const { state } = props;
  return { commandCanceled, state };
}
