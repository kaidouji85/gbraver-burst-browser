import { GameProps } from "../../game-props";

/**
 * ネット対戦キャンセル時の処理
 * @param props ゲームプロパティ
 */
export function onNetBattleCancel(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}
