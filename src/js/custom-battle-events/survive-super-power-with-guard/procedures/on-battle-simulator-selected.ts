import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  focusOutBattleSimulatorButton,
  isBattleSimulatorButtonFocused,
} from "../../focus";

/**
 * バトルシミュレーターが開始されたときの処理
 * @param props イベントプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onBattleSimulatorSelected(
  props: Readonly<CustomBattleEventProps>,
) {
  if (isBattleSimulatorButtonFocused(props)) {
    await focusOutBattleSimulatorButton(props);
  }
}
