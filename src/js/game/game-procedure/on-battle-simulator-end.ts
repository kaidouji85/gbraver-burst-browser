import { GameProps } from "../game-props";

/**
 * 戦闘シミュレーター終了時の処理
 * @param props プロパティ
 */
export function onBattleSimulatorEnd(props: GameProps) {
  const { domDialogBinder } = props;
  domDialogBinder.hidden();
}
