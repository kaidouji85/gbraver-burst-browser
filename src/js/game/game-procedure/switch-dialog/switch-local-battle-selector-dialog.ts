import { LocalBattleSelectorDialog } from "../../../dom-dialogs/local-battle-selector";
import { GameProps } from "../../game-props";

/**
 * ローカル対戦選択ダイアログに切り替える
 * @param props プロパティ
 * @param dialog ダイアログ
 */
export const switchLocalBattleSelectorDialog = (
  props: GameProps,
  dialog: LocalBattleSelectorDialog,
) => props.domDialogBinder.bind(dialog, []);
