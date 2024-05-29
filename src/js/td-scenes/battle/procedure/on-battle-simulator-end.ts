import { BattleSceneProps } from "../props";

/**
 * 戦闘シミュレーション終了時の処理
 * @param props プロパティ
 */
export function onBattleSimulatorEnd(props: BattleSceneProps) {
  const { domDialogBinder } = props;
  domDialogBinder.hidden();
}
