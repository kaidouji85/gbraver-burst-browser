import { GameProps } from "../../game-props";

/**
 * ゲストがプライベートマッチエントリを取り下げる
 * @param props ゲームプロパティ
 */
export function onWithdrawPrivateMatchEntry(props: Readonly<GameProps>): void {
  props.domDialogBinder.hidden();
}
