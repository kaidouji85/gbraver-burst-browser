import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { netBattleSelectorDialogConnector } from "../action-connector/net-battle-selector-dialog-connector";
import { GameProps } from "../game-props";

/**
 * ネットバトル開始時の処理
 * @param props ゲームプロパティ
 */
export function onNetBattleStart(props: Readonly<GameProps>) {
  props.domDialogBinder.bind(
    new NetBattleSelectorDialog(props.resources),
    netBattleSelectorDialogConnector
  );
}
