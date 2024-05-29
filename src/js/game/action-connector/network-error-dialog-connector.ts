import { map } from "rxjs";

import { ActionManager } from "../../action-manager/action-manager";
import { DomDialogActionConnector } from "../../dom-dialogs/dom-dialog-binder/action-connector";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { GameAction } from "../game-actions";

/**
 * 通信エラーダイアログのアクションコネクタを生成する
 * @param gameAction アクション管理オブジェクト
 * @returns アクションコネクタ
 */
export const networkErrorDialogConnector =
  (
    gameAction: ActionManager<GameAction>,
  ): DomDialogActionConnector<NetworkErrorDialog> =>
  (dialog) =>
    gameAction.connect([
      dialog.notifyPostNetworkError().pipe(
        map((postNetworkError) => ({
          type: "EndNetworkError",
          postNetworkError,
        })),
      ),
    ]);
