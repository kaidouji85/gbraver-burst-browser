import { waitAnimationFrame } from "../../../../wait/wait-animation-frame";
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
    await waitAnimationFrame(); // ダイアログが確実に隠れるようにするため、1フレーム待機
    await props.customBattleEvent.afterBattleSimulatorClosed(eventProps);
  }
}
