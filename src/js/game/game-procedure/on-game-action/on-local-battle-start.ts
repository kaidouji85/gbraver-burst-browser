import { LocalBattleSelectorDialog } from "../../../dom-dialogs/local-battle-selector";
import { LocalBattleStart } from "../../game-actions/local-battle-start";
import { GameProps } from "../../game-props";
import { switchLocalBattleSelectorDialog } from "../switch-dialog/switch-local-battle-selector-dialog";

/**
 * ローカル対戦が開始されたときの処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onLocalBattleStart = (options: {
  props: Readonly<GameProps>;
  action: Readonly<LocalBattleStart>;
}) => {
  const { props } = options;
  const dialog = new LocalBattleSelectorDialog(props);
  switchLocalBattleSelectorDialog(props, dialog);
};
