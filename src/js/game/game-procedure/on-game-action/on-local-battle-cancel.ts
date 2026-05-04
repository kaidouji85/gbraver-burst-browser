import { LocalBattleCancel } from "../../game-actions/local-battle-cancel";
import { GameProps } from "../../game-props";

/**
 * ローカル対戦キャンセル時の処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 */
export const onLocalBattleCancel = (options: {
  props: GameProps;
  action: LocalBattleCancel;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
};
