import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { GameProps } from "../../game-props";

/**
 * 作業待ちダイアログに切り替える
 * @param props ゲームプロパティ
 * @param dialog 作業待ちダイアログ
 */
export const switchWaitingDialog = (props: GameProps, dialog: WaitingDialog) =>
  props.domDialogBinder.bind(dialog, []);
