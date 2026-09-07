import { PasswordMatchCancel } from "../../game-actions/password-match-cancel";
import { GameProps } from "../../game-props";

/**
 * あいことば対戦キャンセル時の処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 */
export const onPasswordMatchCancel = (options: {
  props: GameProps;
  action: PasswordMatchCancel;
}) => {
  const { props } = options;
  props.domDialogBinder.hidden();
};
