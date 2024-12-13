import { NetBattleCancel } from "../../game-actions/net-battle-cancel";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: NetBattleCancel;
};

/**
 * ネット対戦キャンセル時の処理
 * @param options オプション
 */
export function onNetBattleCancel(options: Options): void {
  const { props } = options;
  props.domDialogBinder.hidden();
}
