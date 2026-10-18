import { BattleSceneProps } from "../../props";

/**
 * ステータスを閉じる時の処理
 * @param props プロパティ
 */
export function onStatusClosing(props: BattleSceneProps) {
  const { domDialogBinder } = props;
  domDialogBinder.hidden();
}
