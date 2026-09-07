import { WithdrawPasswordMatchEntry } from "../../game-actions/withdraw-local-battle-entry";
import { GameProps } from "../../game-props";

/**
 * ゲストがあいことば対戦エントリを取り下げる
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 */
export const onWithdrawPasswordMatchEntry = async (options: {
  props: GameProps;
  action: WithdrawPasswordMatchEntry;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
};
