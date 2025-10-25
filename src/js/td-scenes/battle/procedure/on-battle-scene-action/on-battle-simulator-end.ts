import { BattleSceneProps } from "../../props";

/**
 * 戦闘シミュレーション終了時の処理
 * @param props プロパティ
 */
export async function onBattleSimulatorEnd(props: BattleSceneProps) {
  const { domDialogBinder } = props;
  domDialogBinder.hidden();
  await props.customBattleEvent?.afterBattleSimulatorClosed(props);
}
