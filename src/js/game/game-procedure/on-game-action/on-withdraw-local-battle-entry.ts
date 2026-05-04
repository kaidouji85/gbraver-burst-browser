import { WithdrawLocalBattleEntry } from "../../game-actions/withdraw-local-battle-entry";
import { GameProps } from "../../game-props";

/**
 * ゲストがローカル対戦エントリを取り下げる
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 */
export const onWithdrawLocalBattleEntry = async (options: {
  props: GameProps;
  action: WithdrawLocalBattleEntry;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
};
