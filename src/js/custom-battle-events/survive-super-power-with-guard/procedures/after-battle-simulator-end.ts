import { BattleSimulatorEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { SurviveSuperPowerWithGuardProps } from "../props";

/**
 * バトルシミュレーターが閉じられた後のイベント処理
 * @param props イベントプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export async function afterBattleSimulatorEnd(
  props: Readonly<BattleSimulatorEventProps & SurviveSuperPowerWithGuardProps>,
): Promise<void> {
  // NOP
}
