import { PasswordMatchSelectorDialog } from "../../../dom-dialogs/password-match-selector";
import { PasswordMatchStart } from "../../game-actions/password-match-start";
import { GameProps } from "../../game-props";
import { switchPasswordMatchSelectorDialog } from "../switch-dialog/switch-password-match-selector-dialog";

/**
 * あいことば対戦が開始されたときの処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onPasswordMatchStart = (options: {
  props: Readonly<GameProps>;
  action: Readonly<PasswordMatchStart>;
}) => {
  const { props } = options;
  const dialog = new PasswordMatchSelectorDialog(props);
  switchPasswordMatchSelectorDialog(props, dialog);
};
