import { WithdrawPrivateMatchEntry } from "../../game-actions/withdraw-private-match-entry";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: WithdrawPrivateMatchEntry;
};

/**
 * ゲストがプライベートマッチエントリを取り下げる
 * @param options オプション
 */
export function onWithdrawPrivateMatchEntry(options: Options): void {
  const { props } = options;
  props.domDialogBinder.hidden();
}
