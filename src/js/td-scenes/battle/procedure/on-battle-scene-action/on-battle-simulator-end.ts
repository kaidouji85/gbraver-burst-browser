import { BattleSceneProps } from "../../props";
import { createBattleSimulatorEventProps } from "../create-battle-simulator-event-props";

/**
 * 戦闘シミュレーション終了時の処理
 * @param props プロパティ
 */
export async function onBattleSimulatorEnd(props: BattleSceneProps) {
  const { domDialogBinder } = props;
  domDialogBinder.hidden();
  const eventProps = createBattleSimulatorEventProps(props);
  if (eventProps && props.customBattleEvent) {
    await props.customBattleEvent.afterBattleSimulatorClosed(eventProps);
  }
}
