import { PasswordMatchSelectorDialog } from "../../../dom-dialogs/password-match-selector";
import { LocalBattleStart } from "../../game-actions/local-battle-start";
import { GameProps } from "../../game-props";
import { switchLocalBattleSelectorDialog } from "../switch-dialog/switch-local-battle-selector-dialog";

/**
 * あいことば対戦が開始されたときの処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onPasswordMatchStart = (options: {
  props: Readonly<GameProps>;
  action: Readonly<LocalBattleStart>;
}) => {
  const { props } = options;
  const dialog = new PasswordMatchSelectorDialog(props);
  switchLocalBattleSelectorDialog(props, dialog);
};
